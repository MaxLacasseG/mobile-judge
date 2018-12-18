const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("./keys");
const logger = require("tracer").colorConsole();
const utilisateurController = require("../controllers/Utilisateur");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JWTStrategy(opts, (jwt_payload, done) => {
            return utilisateurController
                .rechercherParId(jwt_payload.id)
                .then(resultat => {
                    if (resultat) {
                        //TODO:CHECK IF JUDGE OR USER
                        const user = {
                            _id: jwt_payload._id,
                            courriel: jwt_payload.courriel,
                            prenom: jwt_payload.prenom,
                            nom: jwt_payload.nom,
                            telephone: jwt_payload.telephone,
                            region: jwt_payload.region,
                            isAdmin: jwt_payload.isAdmin
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
