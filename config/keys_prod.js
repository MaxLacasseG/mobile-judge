module.exports = {
	mongoURI: process.env.MONGO_URI,
	secretOrKey: process.env.SECRET_OR_KEY,
	nodemailerOptions: {
		auth: {
			api_user: process.env.NODEMAILER_USER,
			api_key: process.env.NODEMAILER_KEY
		}
	}
};
