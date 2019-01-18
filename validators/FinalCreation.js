const validator = require("validator");
const isEmpty = require("../utils/isEmpty");
const logger = require("tracer").colorConsole();

const ValidateFinalCreation = finalInfos => {
    //Will contains errors, if any
    let errors = {};

    //Checks if there is something.
    //If empty, change field to empty string for Validator to check "isEmpty" correctly
    //If contains info, sanetize info

    //STRINGS,INT,ID
    finalInfos.adminId = !isEmpty(finalInfos.adminId) ? validator.escape(finalInfos.adminId).trim(finalInfos.adminId) : "";
    finalInfos.eventDate = !isEmpty(finalInfos.eventDate) ? validator.escape(finalInfos.eventDate).trim(finalInfos.eventDate) : "";
    finalInfos.longName = !isEmpty(finalInfos.longName) ? validator.escape(finalInfos.longName).trim(finalInfos.longName) : "";
    finalInfos.program = !isEmpty(finalInfos.program) ? validator.escape(finalInfos.program.toString()).trim(finalInfos.program.toString()) : "";
    finalInfos.location = !isEmpty(finalInfos.location) ? validator.escape(finalInfos.location).trim(finalInfos.location.toString()) : "";
    finalInfos.region = !isEmpty(finalInfos.region) ? validator.escape(finalInfos.region.toString()).trim(finalInfos.region) : "";
    finalInfos.level = !isEmpty(finalInfos.level) ? validator.escape(finalInfos.level).trim(finalInfos.level) : "";

    //ADMINID
    if (validator.isEmpty(finalInfos.adminId)) {
        errors.adminId = "Finale associé à aucun administrateur";
    }

    //eventDate
    if (!validator.toDate(finalInfos.eventDate)) {
        errors.eventDate = "Format de date incorrect";
    }

    //eventDate
    if (validator.isEmpty(finalInfos.eventDate)) {
        errors.eventDate = "Date de jugement inconnue";
    }

    //longName
    if (validator.isEmpty(finalInfos.longName)) {
        errors.longName = "Nom de finale inconnu";
    }

    //program
    if (!validator.isInt(finalInfos.program)) {
        errors.program = "Format de programme incorrect";
    }
    if (validator.isEmpty(finalInfos.program)) {
        errors.program = "Numéro de programme inconnu";
    }

    //location
    if (validator.isEmpty(finalInfos.location)) {
        errors.location = "Lieu de finale inconnu";
    }

    //region
    if (!validator.isInt(finalInfos.region)) {
        errors.region = "Format de région incorrect";
    }
    if (validator.isEmpty(finalInfos.region)) {
        errors.region = "Numéro de région inconnu";
    }

    //level
    if (validator.isIn(finalInfos.level, ["elementary", "highschool"])) {
        errors.level = "Valeur du volet incorrect";
    }

    if (validator.isEmpty(finalInfos.level)) {
        errors.level = "Volet de la finale inconnu";
    }

    //logger.log(errors);
    //If error is empty, isValid === true && return sanetized data
    //If contains errors, sanetizedData === null
    return {
        errors,
        isValid: isEmpty(errors),
        sanitizedData: isEmpty(errors) ? finalInfos : null
    };
};

module.exports = ValidateFinalCreation;
