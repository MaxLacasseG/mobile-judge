const validator = require("validator");
const isEmpty = require("../utils/isEmpty");

const ValidateInitPwd = data => {
	let errors = {};

	//Checks if there is something. If empty, change field to empty string for Validator to checks "if empty" correctly
	data._id = !isEmpty(data._id) ? validator.escape(data._id).trim(data._id) : "";
	data.pwd = !isEmpty(data.pwd) ? validator.escape(data.pwd).trim(data.pwd) : "";
	data.pwd2 = !isEmpty(data.pwd2) ? validator.escape(data.pwd2).trim(data.pwd2) : "";

	if (validator.isEmpty(data._id)) {
		errors.id = "Erreur. Aucun identifiant associé au compte";
	}

	if (
		!validator.matches(data.pwd, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/) &&
		!validator.isLength(data.pwd, { min: 8, max: 16 })
	) {
		errors.pwd =
			"Votre mot de passe doit comporter entre 8 et 16 caractères dont une minuscule, une majuscule et un chiffre";
	}

	if (validator.isEmpty(data.pwd)) {
		errors.pwd = "Veuillez entrer un mot de passe";
	}

	if (!validator.equals(data.pwd, data.pwd2)) {
		errors.pwd2 = "Les mots de passe ne concordent pas";
	}

	if (validator.isEmpty(data.pwd2)) {
		errors.pwd2 = "Veuillez confirmer le mot de passe";
	}

	return {
		errors,
		isValid: isEmpty(errors),
		sanitizedData: isEmpty(errors) ? data : null
	};
};

module.exports = ValidateInitPwd;
