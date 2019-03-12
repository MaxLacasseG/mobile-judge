import React, { Component } from "react";
import { connect } from "react-redux";
class PairingAlgo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nbPeriods: null,
			nbJudgmentsPerProject: null,
			nbPauses: null,
			nbPeriodsWithPause: null,
			nbProjectsPerPeriod: null,
			nbProjectsOver: null,
			level: null,
			removeFirstLastPeriod: false,
			englishJudges: [],
			bilangualJudges: [],
			frenchJudges: [],
			englishProjects: [],
			bilangualProjects: [],
			frenchProjects: []
		};
	}

	componentDidMount = () => {
		//console.log(this.InitializeRandomizer("highschool"));
		/* let project = this.props.project.projectsList[0];
		const judgesList = this.props.judge.judgesList.filter(judge => {
			return judge.number !== undefined && judge.number !== null;
		});
		console.log(judgesList);
		for (const judge of judgesList) {
			this.SelectJudge(judge, project);
		} */
		this.OrderJudgesByLanguage();
		this.OrderProjectsByLanguage();
		console.log(this.state);
	};

	InitializeRandomizer = selectedLevel => {
		let pairingByProjects = {};
		let pairingByJudges = {};
		const projectListArray = this.props.project.projectsList;

		const level = selectedLevel;
		let nbPeriods, nbJudgmentsPerProject;
		let removeFirstLastPeriod = this.state.removeFirstLastPeriod;

		//Assign cases
		switch (level) {
			case "elementary":
				nbPeriods = 5;
				nbJudgmentsPerProject = 3;
				break;
			case "highschool":
			default:
				nbPeriods = 6;
				nbJudgmentsPerProject = 5;
				break;
		}

		for (let project = 0; project < projectListArray.length; project++) {
			pairingByProjects[project] = {};

			for (let period = 1; period <= nbPeriods; period++) {
				pairingByProjects[project][period] = {
					project: projectListArray[project].number,
					period
				};
			}
		}
		const nbPauses = nbPeriods - nbJudgmentsPerProject;
		pairingByProjects = this.AssignPause(pairingByProjects, nbPeriods, nbPauses);

		return true;
	};

	OrderJudgesByLanguage = () => {
		const judgesList = this.props.judge.judgesList;
		const englishJudges = [],
			bilangualJudges = [],
			frenchJudges = [];
		judgesList.map(judge => {
			if (
				judge.information.judgingExperience.judgingFrench === "no" &&
				judge.information.judgingExperience.judgingEnglish === "yes"
			) {
				return englishJudges.push(judge);
			} else if (
				judge.information.judgingExperience.judgingFrench === "yes" &&
				judge.information.judgingExperience.judgingEnglish === "yes"
			) {
				return bilangualJudges.push(judge);
			} else if (
				judge.information.judgingExperience.judgingFrench === "yes" &&
				judge.information.judgingExperience.judgingEnglish === "no"
			) {
				return frenchJudges.push(judge);
			}
		});
		this.setState({ englishJudges, bilangualJudges, frenchJudges });
	};

	OrderProjectsByLanguage = () => {
		const projectsList = this.props.project.projectsList;
		const englishProjects = [],
			bilangualProjects = [],
			frenchProjects = [];

		projectsList.map(project => {
			if (
				project.information.projectInformation.languageFrench === "no" &&
				project.information.projectInformation.languageEnglish === "yes"
			) {
				return englishProjects.push(project);
			} else if (
				project.information.projectInformation.languageFrench === "yes" &&
				project.information.projectInformation.languageEnglish === "yes"
			) {
				return bilangualProjects.push(project);
			} else if (
				project.information.projectInformation.languageFrench === "yes" &&
				project.information.projectInformation.languageEnglish === "no"
			) {
				return frenchProjects.push(project);
			}
		});
		this.setState({ englishProjects, bilangualProjects, frenchProjects });
	};

	AssignPause = (pairingByProjects, nbPeriods, nbPauses) => {
		for (const project in pairingByProjects) {
			for (let indexPause = 0; indexPause < nbPauses; indexPause++) {
				const randomIndex = Math.floor(Math.random() * nbPeriods);
				if (pairingByProjects[project][randomIndex].judge !== undefined) {
					indexPause--;
					continue;
				}
				pairingByProjects[project][randomIndex].judge = null;
			}
		}
		return pairingByProjects;
	};

	SelectJudge = (judge, project) => {
		let rank = 0;
		let projectCategory = project.information.projectInformation.category;
		let projectType = project.information.projectInformation.type;
		let projectClassification = project.classification;
		let judgingPreference = judge.information.judgingPreference;

		//console.log("avant", rank);
		rank += this.CheckCategoryPref(judgingPreference, projectCategory);
		//console.log("apresCat", rank);
		rank += this.CheckClassificationPref(judgingPreference, projectClassification);
		//console.log("apresClass", rank);
		rank += this.CheckTypePref(judgingPreference, projectType);
		//console.log("apresType", rank);
		console.log("project:", project.number, "judge:", judge.number, rank);
	};

	CheckCategoryPref = (judgingPreference, projectCategory) => {
		if (judgingPreference === undefined) return -1000;

		if (projectCategory === judgingPreference.categoryFirst) {
			return 1000;
		} else if (projectCategory === judgingPreference.categorySecond) {
			return 750;
		} else if (projectCategory === judgingPreference.categoryThird) {
			return 500;
		}
		return 0;
	};

	CheckClassificationPref = (judgingPreference, projectClassification) => {
		if (judgingPreference === undefined) return -1000;

		if (projectClassification === judgingPreference.academicFirst) {
			return 1000;
		} else if (projectClassification === judgingPreference.academicSecond) {
			return 750;
		} else if (projectClassification === judgingPreference.academicThird) {
			return 500;
		}
		return 0;
	};

	CheckTypePref = (judgingPreference, projectType) => {
		if (judgingPreference === undefined) return -1000;

		if (projectType === judgingPreference.typeFirst) {
			return 1000;
		} else if (projectType === judgingPreference.typeSecond) {
			return 750;
		}
		return 0;
	};

	AssignJudgesToPeriods = () => {};

	render() {
		return (
			<div>
				<h1>test</h1>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	final: state.final,
	project: state.project,
	judge: state.judge
});

export default connect(mapStateToProps)(PairingAlgo);
