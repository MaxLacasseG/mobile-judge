var express = require("express");
var router = express.Router();
var passport = require("passport");
var logger = require("tracer").colorConsole();

var EtablissementController = require("../controllers/Etablissement");

router.post("/", (req, res) => {
   EtablissementController.creer(req.body)
      .then(resultat => {
         res.json(resultat);
      })
      .catch(err => {
         res.json(err);
      });
});

router.get("/", (req, res) => {
   EtablissementController.rechercherTous()
      .then(resultat => {
         res.json(resultat);
      })
      .catch(err => {
         res.json(err);
      });
});

router.put("/", (req, res) => {
   EtablissementController.modifier(req.body)
      .then(region => {
         return EtablissementController.rechercherParId(region._id);
      })
      .then(resultat => {
         res.json(resultat);
      })
      .catch(err => {
         res.json(err);
      });
});
module.exports = router;
