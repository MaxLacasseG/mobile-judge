const logger = require("tracer").colorConsole();
const Juge = require("../models/Judge");
const controller = {};

controller.rechercher = filtre => {
    return Juge.find(filtre);
};

controller.rechercherId = jugeId => {
    return Juge.findById(jugeId);
};

controller.rechercherFinale = finaleId => {
    return Juge.find({ finale: finaleId });
};

controller.rechercherTous = () => {
    return Juge.find({});
};

controller.creer = jugeInfos => {
    //TODO: Validation
    const newJuge = new Juge(jugeInfos);
    newJuge.projets = [];
    return newJuge.save();
};

controller.modifier = jugeId => {
    //TODO: Validation
    return Juge.findByIdAndUpdate(jugeId._id, jugeId, { new: true });
};

controller.supprimerUn = jugeId => {
    return Juge.findByIdAndDelete(jugeId);
};

controller.supprimerJugesFinale = finaleId => {
    return Juge.deleteMany({ finale: finaleId })
        .then(resultats => {
            return Juge.deleteMany(resultats);
        })
        .catch(err => {
            throw err;
        });
};

controller.supprimerTous = () => {
    return Juge.deleteMany({})
        .then(resultats => {
            return resultats;
        })
        .catch(err => {
            throw err;
        });
};

module.exports = controller;
