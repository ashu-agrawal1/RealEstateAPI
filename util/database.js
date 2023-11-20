const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connectionDb() {
	return new Promise((resolve, reject) => {
		mongoose.connect(process.env.DB_URL + 'realState', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const db = mongoose.connection;
		db.on('error', (err) => {
			console.error('MongoDB connection error:', err)
			reject(err)
		});
		db.once('open', () => {
			console.log('Connected to MongoDB')
			resolve()
		});
	});
}
module.exports = { connectionDb }