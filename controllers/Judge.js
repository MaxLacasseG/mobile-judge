const logger = require("tracer").colorConsole();
const Judge = require("../models/Judge");
const isEmpty = require("../utils/isEmpty");
const controller = {};
const mongoose = require("mongoose");

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
	//Checks if exists
	return Judge.find({ finalId: judgeInfos.finalId, judgeId: judgeInfos.judgeId }).then(result => {
		//If new, create judge, else update infos
		if (result.length === 0) {
			const newJuge = new Judge(judgeInfos);
			return newJuge.save({ new: true });
		} else {
			return Judge.findOneAndUpdate({ _id: result[0]._id }, result[0], { new: true })
				.then(updatedJudge => {
					//logger.log("UPDATE");
					return updatedJudge;
				})
				.catch(err => {
					throw err;
				});
		}
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
