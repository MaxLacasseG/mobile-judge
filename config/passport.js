const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("./keys");
const logger = require("tracer").colorConsole();
const utilisateurController = require("../controllers/utilisateur");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JWTStrategy(opts, (jwt_payload, done) => {
            return employeController
                .rechercherParId(jwt_payload.id)
                .then(resultat => {
                    if (resultat) {
                        const user = {
                            id: jwt_payload.id,
                            prenom: jwt_payload.prenom,
                            nom: jwt_payload.nom,
                            courriel: jwt_payload.courriel,
                            admin: jwt_payload.admin,
                            regions: jwt_payload.regions
                        };

                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    throw err;
                });
        })
    );
};
