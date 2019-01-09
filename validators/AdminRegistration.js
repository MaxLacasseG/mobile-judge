const validator = require("validator");
const isEmpty = require("../utils/isEmpty");
const logger = require("tracer").colorConsole();

const ValidateAdminRegistration = adminInfos => {
    //Will contains errors, if any
    let errors = {};

    //Checks if there is something.
    //If empty, change field to empty string for Validator to check "isEmpty" correctly
    //If contains info, sanetize info
    adminInfos.email = !isEmpty(adminInfos.email) ? validator.escape(adminInfos.email).trim(adminInfos.email) : "";
    adminInfos.pwd = !isEmpty(adminInfos.pwd) ? validator.escape(adminInfos.pwd).trim(adminInfos.pwd) : "";
    adminInfos.pwd2 = !isEmpty(adminInfos.pwd2) ? validator.escape(adminInfos.pwd2).trim(adminInfos.pwd2) : "";
    adminInfos.firstName = !isEmpty(adminInfos.firstName) ? validator.escape(adminInfos.firstName).trim(adminInfos.firstName) : "";
    adminInfos.lastName = !isEmpty(adminInfos.lastName) ? validator.escape(adminInfos.lastName).trim(adminInfos.lastName) : "";
    adminInfos.phone = !isEmpty(adminInfos.phone) ? validator.escape(adminInfos.phone).trim(adminInfos.phone) : "";
    adminInfos.organization = !isEmpty(adminInfos.organization) ? validator.escape(adminInfos.organization).trim(adminInfos.organization) : "";
    adminInfos.isAdmin = !isEmpty(adminInfos.isAdmin) ? validator.escape(adminInfos.isAdmin.toString()).trim(adminInfos.isAdmin.toString()) : "";

    //EMAIL
    if (!validator.isEmail(adminInfos.email)) {
        errors.email = "Format de courriel invalide";
    }

    if (validator.isEmpty(adminInfos.email)) {
        errors.email = "Vous devez fournir un courriel";
    }

    //PWD
    if (validator.isEmpty(adminInfos.pwd)) {
        errors.pwd = "Vous devez fournir un mot de passe";
    }

    //PWD2

    if (!validator.equals(adminInfos.pwd, adminInfos.pwd2)) {
        errors.pwd2 = "Les mots de passe ne concordent pas";
    }
    if (validator.isEmpty(adminInfos.pwd2)) {
        errors.pwd2 = "Veuillez entrer le mot de passe de nouveau";
    }

    //FIRST NAME
    if (validator.isEmpty(adminInfos.firstName)) {
        errors.firstName = "Vous devez fournir un prénom";
    }

    //LAST NAME
    if (validator.isEmpty(adminInfos.lastName)) {
        errors.lastName = "Vous devez fournir un nom de famille";
    }

    //PHONE
    if (validator.isEmpty(adminInfos.phone)) {
        errors.phone = "Vous devez fournir un numéro de téléphone en cas d'urgence";
    }

    //ORGANIZATION
    if (validator.isEmpty(adminInfos.organization)) {
        errors.organization = "Vous devez choisir un organisme régional";
    }
    //IS ADMIN
    if (!validator.isBoolean(adminInfos.isAdmin)) {
        errors.isAdmin = "Valeur booléenne requise";
    }

    //logger.log(errors);
    //If error is empty, isValid === true && return sanetized data
    //If contains errors, sanetizedData === null
    return {
        errors,
        isValid: isEmpty(errors),
        sanitizedData: isEmpty(errors) ? adminInfos : null
    };
};

module.exports = ValidateAdminRegistration;
