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
	return Judge.find({ finalId: judgeInfos.finalId, judgeId: judgeInfos.judgeId })
		.then(result => {
			//====
			// CREATES PASSWORD FOR USER AND ADDS to JUDGEINFOS
			// SPECIAL CHARACTER COMES FROM NEW FINAL MODAL -> CREATEFINAL()
			const { firstName, lastName, email } = judgeInfos.information.generalInformation;
			const postalCode =
				judgeInfos.information.generalInformation.address.postalCode || "H1V 0B2";
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
				return newJuge.save({ new: true }).catch(err => {
					logger.warn(err);
					throw { err, judgeInfos };
				});
			} else {
				return Judge.findOneAndUpdate({ _id: result[0]._id }, result[0], { new: true })
					.then(updatedJudge => {
						return updatedJudge;
					})
					.catch(err => {
						logger.warn(err);
						throw { err, judgeInfos };
					});
			}
		})
		.catch(err => {
			logger.warn(err);
			throw { err, judgeInfos };
		});
};

controller.AddNew = judgeInfos => {
	//Check if exist
	//Format data
	//Save judge
	//Return new judge
	return true;
};

controller.Login = credentials => {
	return Judge.findOne({ finalId: credentials.finalId, username: credentials.username })
		.select("+pwd")
		.then(judge => {
			//If user is not found in DB
			if (isEmpty(judge)) throw { success: false, username: "Utilisateur inconnu" };
			console.log(credentials.pwd, judge.pwd);

			return {
				isMatch: credentials.pwd === judge.pwd,
				judge
			};
		})
		.then(result => {
			if (!result.isMatch) throw { success: false, pwd: "Mot de passe erroné." };
			const judge = result.judge;

			const payload = {
				id: judge._id,
				username: judge.email,
				judgeId: judge.judgeId,
				finalId: judge.finalId,
				information: judge.information,
				number: judge.number,
				type: "JUDGE"
			};

			//Create the token, expires after 1 hour
			const token = JWT.sign(payload, process.env.SECRETORKEY, {
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
