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

/* router.get("/:email", function(req, res) {
	UtilisateurController.rechercher(req.params.email).then(function(user) {
		var data;
		if (user) {
			var data = user.toObject();
			delete data.password;
		}
		return res.status(200).send({ success: true, user: data });
	});
}); */

router.post("/logout", function(
    req,
    res
) {}); /* 
router.post("/forgotPassword", function(req, res) {
	UserController.forgotPassword(req.body.email).then(
		function() {
			return res.status(200).send({ success: true });
		},
		function(err) {
			logger.error(err);
			return res.status(200).send(err);
		}
	);
});

router.get("/forgotPassword/:resetCode", function(req, res) {
	UserController.findResetCode(req.params.resetCode).then(function(user) {
		if (!user) {
			return res.redirect("/#/login?invalidResetCode=true");
		}
		req.session.resetUser = user;
		res.redirect("/#/reset-password");
	});
});

router.post("/passwordReset", function(req, res) {
	if (!req.session.resetUser) {
		return res.status(200).send({ success: false });
	}
	UserController.resetPassword(req.session.resetUser, req.body.password).then(
		function() {
			req.session.resetUser = undefined;
			return res.status(200).send({ success: true });
		},
		function(err) {
			logger.error(err);
			return res.status(200).send(err);
		}
	);
});

router.post("/update", requireAuthentication, function(req, res) {
	UserController.update(req.user, req.body).then(
		function(user) {
			return res.status(200).send({ success: true, user: user });
		},
		function(err) {
			logger.error(err);
			return res.status(200).send(err);
		}
	);
}); */ /* router.post(
   "/sendConfirm",
   function(req, res) {
      UtilisateurController.find(req.body.email)
         .then(function(user) {
            return UtilisateurController.sendConfirm(user, req.body.email);
         })
         .then(
            function() {
               return res.status(200).send({ success: true });
            },
            function(err) {
               logger.error(err.stack);
               return res.status(200).send(err);
            }
         );
   }
); */

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
