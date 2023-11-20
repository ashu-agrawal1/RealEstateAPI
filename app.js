const { connectionDb } = require('./util/database.js');
connectionDb()
	.then(() => {
		const { PropertyType } = require("./Models/PropertyType")
		const dotenv = require('dotenv');
		const express = require('express');
		const cors = require('cors');
		const app = express();
		dotenv.config();
		const path = require('path');

		const session = require('express-session');
		const cookieParser = require('cookie-parser');

		const { router } = require('./Routes/routes.js')

		const sessionStore = new session.MemoryStore();

		app.use(express.json());
		app.use(cookieParser());

		app.use(cors({ origin: true, credentials: true }));
		app.use(
			session({
				secret: process.env.SECRET_KEY,
				resave: false,
				saveUninitialized: false,
				cookie: {
					secure: false, // Set to true if using HTTPS
					maxAge: 1000 * 60 * 60 * 12, // Session expiration time (in milliseconds)
					httpOnly: false,
				},
				store: sessionStore,
			})
		);

		app.use('/', router);
		app.use('/propertyImages', express.static(path.join(__dirname, "propertyImages")));

		app.use('*', (req, res) => {
			res.sendStatus(404);
		});

		app.listen(process.env.PORT);

		console.log('Listening on Port ' + process.env.PORT + '...');
	})