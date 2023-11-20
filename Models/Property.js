const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new mongoose.Schema({
    city: String,
    latitude: String,
    longitude: String
});

const propertySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    propertyType: {
        type: mongoose.Schema.Types.ObjectId, ref: 'propertyType',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: locationSchema,
    address: {
        type: String,
        required: false,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Size: {
        type: Number,
        required: true,
    },
    Bedrooms: {
        type: Number,
        required: true,
    },
    Bathrooms: {
        type: Number,
        required: true,
    },
    photos: [String]
});

const Property = mongoose.model('Property', propertySchema);
module.exports = { Property }