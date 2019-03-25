const validator = require("validator");
const isEmpty = require("../utils/isEmpty");
const logger = require("tracer").colorConsole();

const NewJudgeValidator = judgeInfos => {
	//Will contains errors, if any
	let errors = {};

	//Checks if there is something.
	//If empty, change field to empty string for Validator to check "isEmpty" correctly
	//If contains info, sanetize info

	//STRINGS,INT,ID
	judgeInfos.finalId = !isEmpty(judgeInfos.finalId)
		? validator.escape(judgeInfos.finalId).trim(judgeInfos.finalId)
		: "";
	judgeInfos.email = !isEmpty(judgeInfos.email)
		? validator.escape(judgeInfos.email).trim(judgeInfos.email)
		: "";

	judgeInfos.firstName = !isEmpty(judgeInfos.firstName)
		? validator.escape(judgeInfos.firstName).trim(judgeInfos.firstName)
		: "";

	judgeInfos.lastName = !isEmpty(judgeInfos.lastName)
		? validator.escape(judgeInfos.lastName).trim(judgeInfos.lastName)
		: "";

	judgeInfos.postalCode = !isEmpty(judgeInfos.postalCode)
		? validator.escape(judgeInfos.postalCode).trim(judgeInfos.postalCode)
		: "";

	judgeInfos.specialCharacter = !isEmpty(judgeInfos.specialCharacter)
		? validator.escape(judgeInfos.specialCharacter).trim(judgeInfos.specialCharacter)
		: "";

	//FinalId
	if (validator.isEmpty(judgeInfos.finalId)) {
		errors.finalId = "Aucune finale associée au juge";
	}

	//FinalId
	if (validator.isEmpty(judgeInfos.email)) {
		errors.email = "Courriel obligatoire";
	}

	//firstName
	if (validator.isEmpty(judgeInfos.firstName)) {
		errors.firstName = "Prénom obligatoire";
	}

	//lastName
	if (validator.isEmpty(judgeInfos.lastName)) {
		errors.lastName = "Nom de famille obligatoire";
	}

	//PostalCode
	if (validator.isEmpty(judgeInfos.postalCode)) {
		errors.postalCode = "Code postal obligatoire";
	}

	//SpecialCharacter
	if (validator.isEmpty(judgeInfos.specialCharacter)) {
		errors.specialCharacter = "Aucun caractère spécial d'enregistré pour la finale";
	}

	//logger.log(errors);
	//If error is empty, isValid === true && return sanetized data
	//If contains errors, sanetizedData === null
	return {
		errors,
		isValid: isEmpty(errors),
		sanitizedData: isEmpty(errors) ? judgeInfos : null
	};
};

module.exports = NewJudgeValidator;
