const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();
const { PropertyType } = require("../Models/PropertyType.js")

router.get('/', async (req, res) => {
    try {
        const types = await PropertyType.find();
        res.json(types);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = { propertyTypesRouter: router };
