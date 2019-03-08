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
			removeFirstLastPeriod: false
		};
	}

	componentDidMount = () => {
		console.log(this.InitializeRandomizer("highschool"));
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
