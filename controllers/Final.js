const logger = require("tracer").colorConsole();
const Final = require("../models/Final");
const Judge = require("../models/Judge");
const isEmpty = require("../utils/isEmpty");

const ProjectController = require("./Project");
const JudgeController = require("./Judge");

const controller = {};

controller.Find = filtre => {
    return Final.find(filtre);
};

controller.FindById = finaleId => {
    return Final.findById(finaleId);
};

controller.FindAll = () => {
    return Final.find({});
};

controller.Create = finalInfos => {
    const newFinal = new Final(finalInfos);

    return newFinal
        .save()
        .then(final => {
            return final;
        })
        .catch(err => {
            throw err;
        });
};

controller.Update = finalInfos => {
    return Final.findByIdAndUpdate(finalInfos._id, finalInfos, {
        new: true
    });
};

controller.DeleteOne = finalId => {
    return Final.findByIdAndDelete(finalId);
};

controller.DeleteAll = () => {
    return Final.deleteMany({});
};

controller.Archive = async finalId => {
    return controller
        .FindById(finalId)
        .then(finalArchive => {
            if (finalArchive === null || finalArchive === undefined) {
                throw { success: false, msg: "Finale non trouvée" };
            }

            finalArchive.isActive = false;
            return finalArchive.save();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

controller.UnArchive = async finalId => {
    return controller
        .FindById(finalId)
        .then(finalArchive => {
            if (finalArchive === null || finalArchive === undefined) {
                throw { success: false, msg: "Finale non trouvée" };
            }

            finalArchive.isActive = true;
            return finalArchive.save();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

controller.ExportFinalResults = finalId => {
    return true;
};

controller.ExportActiveFinalResults = () => {
    return true;
};

controller.ExportAllFinalResults = () => {
    return true;
};

module.exports = controller;
