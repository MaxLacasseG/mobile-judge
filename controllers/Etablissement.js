const logger = require("tracer").colorConsole();
const Etablissement = require("../models/Etablissement");

const controller = {};

controller.rechercher = critere => {
   return Etablissement.find(critere);
};
controller.rechercherParId = id => {
   return Etablissement.findById(id);
};
controller.rechercherTous = () => {
   return Etablissement.find({});
};
controller.creer = data => {
   const newEtablissement = new Etablissement(data);

   return newEtablissement.save();
};

controller.modifier = data => {
   //TODO: VALIDATION
   return Etablissement.findOneAndUpdate(data._id, data);
};
module.exports = controller;
