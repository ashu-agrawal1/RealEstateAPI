const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require("bcrypt")
const { User } = require("../Models/Users.js")
const { loginHandler } = require('../Controlers/LoginController.js')
const { propertyRouter } = require('./Property.js')
const { propertyTypesRouter } = require('./PropertyTypes.js')

router.use('/properties', propertyRouter);
router.use('/propertytypes', propertyTypesRouter);

router.post('/register', async (req, res) => {
	try {
		const { email, password, firstName, lastName, mobile } = req.body;
		let hash = await bcrypt.hash(
			password,
			+process.env.PASSWORD_HASH_ROUNDS
		);
		const newUser = new User({ email, password: hash, firstName, lastName, mobile });
		await newUser.save();
		res.status(201).json({ message: 'Registered successfully!! Please Login' });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.post('/login', async (req, res) => {
	try {
		await loginHandler(req, res);
	} catch (err) {
		console.log(err);
		res.status(500).send('Something went wrong');
	}
});

router.get('/logout', async (req, res) => {
	// Destroy the session
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).send('Error during Logout');
		}

		res.clearCookie('connect.sid'); // Clear the session cookie
		res.status(200).send('Logout successful');
	});
});
module.exports = { router };
