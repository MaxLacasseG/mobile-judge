const validator = require("validator");
const isEmpty = require("../utils/isEmpty");
const logger = require("tracer").colorConsole();

const ValidateAdminLogin = adminInfos => {
    logger.log(adminInfos);
    //Will contains errors, if any
    let errors = {};

    //Checks if there is something.
    //If empty, change field to empty string for Validator to check "isEmpty" correctly
    //If contains info, sanetize info
    adminInfos.email = !isEmpty(adminInfos.email) ? validator.escape(adminInfos.email).trim(adminInfos.email) : "";
    adminInfos.pwd = !isEmpty(adminInfos.pwd) ? validator.escape(adminInfos.pwd).trim(adminInfos.pwd) : "";

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

    logger.log(errors);
    //If error is empty, isValid === true && return sanetized data
    //If contains errors, sanetizedData === null
    return {
        errors,
        isValid: isEmpty(errors),
        sanitizedData: isEmpty(errors) ? adminInfos : null
    };
};

module.exports = ValidateAdminLogin;
