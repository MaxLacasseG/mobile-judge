const logger = require("tracer").colorConsole();
const Region = require("../models/Region");
const controller = {};

controller.rechercher = filtre => {
    return Region.find(filtre);
};

controller.rechercherId = regionId => {
    return Region.findById(regionId);
};

controller.rechercherTous = () => {
    return Region.find({});
};

controller.creer = regionInfos => {
    //TODO: Validation
    const newRegion = new Region(regionInfos);

    return newRegion.save();
};

controller.modifier = regionInfos => {
    //TODO: Validation
    return Region.findByIdAndUpdate(regionInfos._id, regionInfos);
};

controller.supprimerUn = regionId => {
    return Region.findByIdAndDelete(regionId);
};

controller.supprimerTous = () => {
    return Region.deleteMany({});
};

module.exports = controller;
