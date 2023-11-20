const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const propertyTypeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
});

const PropertyType = mongoose.model('PropertyType', propertyTypeSchema);

const defaultTypes = [{ title: 'RK' }, { title: '1Bhk' }, { title: 'Commercial Properties' }, { title: '2Bhk' }, { title: '3Bhk' }, { title: 'Hostel' }, { title: 'PG' }]

PropertyType.insertMany(defaultTypes)
    .then((res) => {
        console.log(res)
    }).
    catch((_) => {
    })

module.exports = { PropertyType }