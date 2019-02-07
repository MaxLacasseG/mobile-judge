const logger = require("tracer").colorConsole();
const Project = require("../models/Project");
const controller = {};

controller.Find = filter => {
	return Project.find(filter).sort({ number: 1 });
};

controller.rechercherId = projetId => {
	return Project.findById(projetId);
};

controller.rechercherFinale = finaleId => {
	return Project.find({ finale: finaleId });
};

controller.rechercherTous = () => {
	return Project.find({});
};

controller.Create = projectInfos => {
	//Checks if exists
	return Project.find({ finalId: projectInfos.finalId, projectId: projectInfos.projectId }).then(
		result => {
			//If new, create project, else update infos
			if (result.length === 0) {
				const newProject = new Project(projectInfos);
				return newProject.save({ new: true });
			} else {
				return Project.findOneAndUpdate({ _id: result[0]._id }, result[0], { new: true })
					.then(updatedProject => {
						//logger.log("UPDATE Project");
						return updatedProject;
					})
					.catch(err => {
						throw err;
					});
			}
		}
	);
};

controller.modifier = projetId => {
	//TODO: Validation
	return Project.findByIdAndUpdate(projetId._id, projetId, { new: true });
};

controller.supprimerUn = projetId => {
	return Project.findByIdAndDelete(projetId);
};

controller.supprimerProjetsFinale = finaleId => {
	return Project.deleteMany({ finale: finaleId })
		.then(resultats => {
			return resultats;
		})
		.catch(err => {
			throw err;
		});
};

controller.supprimerTous = () => {
	return Project.deleteMany({})
		.then(resultats => {
			return resultats;
		})
		.catch(err => {
			throw err;
		});
};

controller.DeleteMany = projectsList => {
	return Project.remove({ projectId: { $in: projectsList } })
		.then(result => {
			return result;
		})
		.catch(err => {
			logger.log(err);
			throw err;
		});
};

module.exports = controller;
