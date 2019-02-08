const logger = require("tracer").colorConsole();
const Judge = require("../models/Judge");
const isEmpty = require("../utils/isEmpty");
const controller = {};
const mongoose = require("mongoose");

const JWT = require("jsonwebtoken");
const keys = require("../config/keys");

controller.Find = filtre => {
	return Judge.find(filtre);
};

controller.rechercherId = jugeId => {
	return Judge.findById(jugeId);
};

controller.rechercherFinale = finaleId => {
	return Judge.find({ finale: finaleId });
};

controller.rechercherTous = () => {
	return Judge.find({});
};

controller.Create = judgeInfos => {
	//CHECKS IF EXISTS FOR A SPECIFIC FINAL AND A SPECIFIC ID FOR REGISTRATION SYSTEM
	return Judge.find({ finalId: judgeInfos.finalId, judgeId: judgeInfos.judgeId }).then(result => {
		//====
		// CREATES PASSWORD FOR USER AND ADDS to JUDGEINFOS
		// SPECIAL CHARACTER COMES FROM NEW FINAL MODAL -> CREATEFINAL()
		const { firstName, lastName, email } = judgeInfos.information.generalInformation;
		const postalCode = judgeInfos.information.generalInformation.address.postalCode;
		const username = email;
		const pwd = `${firstName.substr(0, 1).toLowerCase()}${postalCode
			.substr(0, 3)
			.toUpperCase()}${postalCode.substr(4, 3).toUpperCase()}${lastName
			.substr(0, 1)
			.toLowerCase()}${judgeInfos.specialCharacter}`;
		judgeInfos.username = username;
		judgeInfos.pwd = pwd;

		//IF NEW, CREATE JUDGE, ELSE UPDATE INFOS
		if (result.length === 0) {
			const newJuge = new Judge(judgeInfos);
			return newJuge.save({ new: true });
		} else {
			return Judge.findOneAndUpdate({ _id: result[0]._id }, result[0], { new: true })
				.then(updatedJudge => {
					return updatedJudge;
				})
				.catch(err => {
					throw err;
				});
		}
	});
};

controller.Login = credentials => {
	return Judge.findOne(credentials)
		.then(judge => {
			if (isEmpty(judge)) throw { success: false, msg: "Courriel ou mot de passe inconnu" };
			logger.log(judge);
			const payload = {
				id: judge._id,
				username: judge.email,
				judgeId: judge.judgeId,
				finalId: judge.finalId,
				information: judge.information,
				type: "JUDGE"
			};

			//Create the token, expires after 1 hour
			const token = JWT.sign(payload, keys.secretOrKey, {
				expiresIn: 10800
			});

			if (!token) {
				throw { success: false, msg: "Impossible de générer le jeton" };
			}

			//Return token
			return {
				success: true,
				msg: "Connecté",
				token: "Bearer " + token
			};
		})
		.catch(err => {
			throw err;
		});
};

controller.modifier = jugeId => {
	//TODO: Validation
	return Judge.findByIdAndUpdate(jugeId._id, jugeId, { new: true });
};

controller.supprimerUn = jugeId => {
	return Judge.findByIdAndDelete(jugeId);
};

controller.DeleteMany = judgesList => {
	return Judge.remove({ judgeId: { $in: judgesList } })
		.then(result => {
			return result;
		})
		.catch(err => {
			logger.log(err);
			throw err;
		});
};

controller.supprimerTous = () => {
	return Judge.deleteMany({})
		.then(resultats => {
			return resultats;
		})
		.catch(err => {
			throw err;
		});
};

module.exports = controller;
