const validator = require("validator");
const isEmpty = require("../utils/isEmpty");
const logger = require("tracer").colorConsole();

const ValidateJudgeLogin = adminInfos => {
	//Will contains errors, if any
	let errors = {};

	//Checks if there is something.
	//If empty, change field to empty string for Validator to check "isEmpty" correctly
	//If contains info, sanetize info
	adminInfos.username = !isEmpty(adminInfos.username)
		? validator.escape(adminInfos.username).trim(adminInfos.username)
		: "";
	adminInfos.pwd = !isEmpty(adminInfos.pwd)
		? validator.escape(adminInfos.pwd).trim(adminInfos.pwd)
		: "";
	adminInfos.finalId = !isEmpty(adminInfos.finalId)
		? validator.escape(adminInfos.finalId).trim(adminInfos.finalId)
		: "";

	//FINAL ID
	if (validator.isEmpty(adminInfos.finalId)) {
		errors.finalId = "Vous devez sélectionner une finale";
	}
	//EMAIL
	if (!validator.isEmail(adminInfos.username)) {
		errors.username = "Format de courriel invalide";
	}

	if (validator.isEmpty(adminInfos.username)) {
		errors.username = "Vous devez fournir un courriel";
	}

	//PWD
	if (validator.isEmpty(adminInfos.pwd)) {
		errors.pwd = "Vous devez fournir un mot de passe";
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

module.exports = ValidateJudgeLogin;
