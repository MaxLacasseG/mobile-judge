const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const keys = require("./keys");

const adminController = require("../controllers/Admin");
const logger = require("tracer").colorConsole();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETORKEY;

module.exports = passport => {
	passport.use(
		new JWTStrategy(opts, (jwt_payload, done) => {
			//Checks if admin or judge
			switch (jwt_payload.type) {
				case "ADMIN":
					return adminController
						.rechercherParId(jwt_payload.id)
						.then(resultat => {
							if (resultat) {
								const user = {
									_id: jwt_payload._id,
									courriel: jwt_payload.courriel,
									prenom: jwt_payload.prenom,
									nom: jwt_payload.nom,
									telephone: jwt_payload.telephone,
									isAdmin: jwt_payload.isAdmin
								};

								return done(null, user);
							}
							return done(null, false);
						})
						.catch(err => {
							throw err;
						});
			}
		})
	);
};
