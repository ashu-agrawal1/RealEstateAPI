const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();
const { Property } = require("../Models/Property.js")
const { authenticateUser } = require("../Middlewares/Auth.js")
const { upload } = require("../util/multer.js")
const fs = require('fs');

router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});
router.get('/own', authenticateUser, async (req, res) => {
    try {
        const owner = req.session.user.userId;
        const properties = await Property.find({ owner });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/filter', async (req, res) => {
    try {
        let { propertyType, minPrice, maxPrice, city, minSize, maxSize, Bedrooms, Bathrooms } = req.body;
        let filter = {}
        if (propertyType) {
            filter.propertyType = propertyType
        }
        if (minPrice) {
            filter.price = {...filter.price, $gte: minPrice }
        }
        if (maxPrice) {
            filter.price = { ...filter.price,$lte: maxPrice }
        }
        if (minSize) {
            filter.Size = {...filter.Size, $gte: minSize }
        }
        if (maxSize) {
            filter.Size = {...filter.Size, $lte: maxSize }
        }
        if (Bedrooms) {
            filter.Bedrooms = { $eq: Bedrooms }
        }
        if (Bathrooms) {
            filter.Bathrooms = { $eq: Bathrooms }
        }
        if (city) {
            filter['location.city'] = city
        }
        const properties = await Property.find(filter);
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/cities', async (req, res) => {
    try {
        Property.aggregate([
            {
                $group: {
                    _id: '$location.city',
                },
            },
            {
                $match: {
                    _id: { $ne: '' }, // Filter out documents where 'location.city' is null
                },
            },
            {
                $project: {
                    city: '$_id',
                    _id: 0,
                },
            },
        ]).then((result) => {
            console.log("result------", result)
            res.json(result);
        }).catch((err) => {
            console.log(err)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    let id = req.params.id
    try {
        const properties = await Property.findOne({ _id: id }).populate('owner', ["firstName", "lastName", "mobile"]);
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', authenticateUser, upload.array('photos[]', 10), async (req, res) => {
    try {
        let { title, propertyType, description, price, location, Size, Bedrooms, Bathrooms, address } = req.body;
        const owner = req.session.user.userId;
        // location = JSON.parse(location)
        location.city = ''
        // const apiKey = "888888"
        const apiKey = process.env.API_KEY3
        const latitude = location.latitude;
        const longitude = location.longitude
        const range = 0

        // Construct the URL for the Geocoding API request
        const geocodingApiUrl = `https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=${latitude}&longitude=${longitude}&range=${range}`;

        // Make the HTTP request
        fetch(geocodingApiUrl, { headers: { "X-RapidAPI-Key": apiKey, "X-RapidAPI-Host": "geocodeapi.p.rapidapi.com" } })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("dataa---------------", data)
                // data = [{
                //         City: 'Delhi',
                //         Population: 10927986,
                //         Latitude: 28.65195,
                //         Longitude: 77.23149,
                //         Country: 'India',
                //         CountryId: 'IN',
                //         TimeZoneId: 'Asia/Kolkata',
                //         TimeZoneName: 'IST',
                //         TimeZone_GMT_offset: 5,
                //         LocalTimeNow: '10:30:42 PM',
                //         Distance: 13867.380791992633,
                //         Bearing: 114.71042723227754,
                //         CompassDirection: 'ESE'
                //     }]
                if (data && data?.length > 0) {
                    location.city = data[0].City
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .then(() => {
                const newProperty = new Property({ title, propertyType, description, price, location, owner, Size, Bedrooms, Bathrooms, address });
                console.log("filess", req.body)
                if (req.files) {
                    newProperty.photos = req.files.map((file) => {
                        return file.path
                    });
                }
                newProperty.save();
                res.status(201).json(newProperty);
            })
    } catch (err) {
        console.log("errr----------------------", err)
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', authenticateUser, async (req, res) => {
    let id = req.params.id
    try {
        const owner = req.session.user.userId;
        Property.findOneAndDelete({ _id: id, owner: owner }).then((result) => {
            console.log(result)
            if (!result) {
                return res.status(400).send("Invalid Property");
            }
            // Delete the associated photo files
            const photoFilenames = result.photos;
            photoFilenames?.forEach((filename) => {
                const filePath = `./${filename}`;
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error deleting photo file:', unlinkErr);
                    }
                });
            })
            res.send("Property Deleted Successfully")
        }).catch((err) => {
            console.log("err", err)
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
});

module.exports = { propertyRouter: router };
