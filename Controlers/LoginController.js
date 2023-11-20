const bcrypt = require("bcrypt")
const { User } = require("../Models/Users.js")

const loginHandler = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ error: 'User not found' });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (passwordMatch) {
			// Set the user in the session
			req.session.user = {
				userId: user.id
			};
			return res.json({ message: 'Login successful' });
		} else {
			return res.status(401).json({ error: 'Incorrect password' });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = { loginHandler }