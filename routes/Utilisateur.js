var express = require("express");
var router = express.Router();
var passport = require("passport");
var logger = require("tracer").colorConsole();

var UtilisateurController = require("../controllers/Utilisateur");
var Utilisateur = require("../models/Utilisateur");

// @route   POST /api/utilisateur/enregistrement
// @desc    Créer un nouvel utilisateur
// @access  private - admin
router.post("/enregistrement", async (req, res) => {
    await UtilisateurController.creer(req.body)
        .then(async result => {
            await res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get(
    "/:email",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        logger.trace(req.user);
        UtilisateurController.courrielExistant(req.params.email)
            .then(resultat => {
                res.status(200).json(resultat);
            })
            .catch(err => {
                res.status(200).json(err);
            });
    }
);

router.post("/connexion", (req, res) => {
    UtilisateurController.connexion(req.body)
        .then(resultat => {
            //logger.log(resultat);
            //TODO:Ajouter le token à passeport
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/oubli-mdp", function(req, res) {
    UtilisateurController.forgotPassword(req.body.courriel, req.headers.host)
        .then(result => {
            logger.log("mail sent", result);
            res.status(200).json({
                success: true,
                msg:
                    "Un courriel vous a été envoyé afin de réinitialiser votre mot de passe"
            });
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//NECESSAIRE?? ou à développer dans la partie client?
router.get("/oubli-mdp", function(req, res) {
    UserController.findResetToken(req.query.resetToken).then(function(user) {
        if (!user) {
            return res.status(400).json({
                resetToken: false,
                msg:
                    "Le code de réinitialisation est invalide ou expiré. Veuillez refaire une demande."
            });
        } else {
            res.status(200).json({
                resetToken: true
            });
        }
    });
});

router.post("/reinit-mdp", function(req, res) {
    UtilisateurController.findResetToken(req.query.token)
        .then(user => {
            if (!user) throw { msg: "Utilisateur non trouvé" };
            return UtilisateurController.reinitMdp(user, req.body.mdp);
        })
        .then(success => {
            res.status(200).json({
                success: true,
                msg: "Mot de passe modifié"
            });
        })
        .catch(err => {
            res.status(400).json({ success: false, err });
        });
});

// router.post("/update", requireAuthentication, function(req, res) {
// 	UserController.update(req.user, req.body).then(
// 		function(user) {
// 			return res.status(200).send({ success: true, user: user });
// 		},
// 		function(err) {
// 			logger.error(err);
// 			return res.status(200).send(err);
// 		}
// 	);
// });

// router.post(
//    "/sendConfirm",
//    function(req, res) {
//       UtilisateurController.find(req.body.email)
//          .then(function(user) {
//             return UtilisateurController.sendConfirm(user, req.body.email);
//          })
//          .then(
//             function() {
//                return res.status(200).send({ success: true });
//             },
//             function(err) {
//                logger.error(err.stack);
//                return res.status(200).send(err);
//             }
//          );
//    }
// );

/* 
router.get("/confirm/:confirmCode", function(req, res) {
	UserController.confirm(req.params.confirmCode)
		.then(function(result) {
			res.redirect("/#/login?emailConfirmed=true&email=" + encodeURIComponent(result.email));
		})
		.then(null, function(err) {
			res.redirect("/#/login?invalidConfirmCode=true");
		});
});
 */ module.exports = router;
