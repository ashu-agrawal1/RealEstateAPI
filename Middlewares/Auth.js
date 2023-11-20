const authenticateUser = (req, res, next) => {
	if (req.session && req.session.user) {
		console.log('authenticated----------------------------');
		return next();
	} else {
		console.log('not authenticated------------------------');
		res.status(401).send('Unauthorized, Please Login');
	}
};
module.exports = { authenticateUser }