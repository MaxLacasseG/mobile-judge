import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import EvaluationSection from "./EvaluationSection";
import { ClearProjectInfos, GetProjectInfos } from "../../../store/actions/projectActions";
import { SaveResult } from "../../../store/actions/finalActions";
import {
	highExperimentationGrid,
	highschoolConceptionGrid,
	highVulgarisationGrid
} from "../../../enums/grids";
import isEmpty from "../../../validation/isEmpty";
import classnames from "classnames";

class EvaluationGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "",
			grid: {
				level: "",
				name: "",
				sections: [],
				type: ""
			},
			results: {},
			isComplete: false
		};
	}
	componentDidMount = () => {
		this.props.GetProjectInfos(this.props.auth.user.finalId, this.props.match.params[0]);
	};

	componentWillUnmount = () => {
		this.props.ClearProjectInfos();
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (
			prevProps.project.selectedProject !== this.props.project.selectedProject &&
			!isEmpty(this.props.project.selectedProject)
		) {
			this.setState(
				{
					type: this.props.project.selectedProject.information.projectInformation.type
				},
				() => {
					this.setState({ grid: this.SetType(this.state.type) }, () => {
						this.InitializeResult();
					});
				}
			);
		}
	};

	SetType = type => {
		switch (type) {
			case "vulgarization":
				return highVulgarisationGrid;
			case "experimentation":
				return highExperimentationGrid;
			case "design":
				return highschoolConceptionGrid;
			default:
				return null;
		}
	};

	InitializeResult = () => {
		const results = {};
		let prefix = 1;
		let suffix = 1;
		this.state.grid.sections.map((section, index) => {
			section.subsections.map((subsection, index) => {
				suffix = 1;
				subsection.criterions.map((criterion, index) => {
					suffix = String.fromCharCode(index + 65);
					results[`${prefix}${suffix}`] = {};
					suffix++;
				});
				prefix++;
			});
		});
		this.setState({ results });
	};

	FormatType = (type, short = false) => {
		let formattedType = "";
		switch (type) {
			case "vulgarization":
				formattedType = short ? "V" : "Vulgarisation";
				break;
			case "conception":
				formattedType = short ? "C" : "Conception";
				break;
			case "experimentation":
				formattedType = short ? "E" : "Expérimentation";
				break;
			default:
				break;
		}
		return formattedType;
	};

	FormatCategory = (category, short = false) => {
		let formattedCategory = "";
		switch (category) {
			case "health_sciences":
				formattedCategory = short ? "SS" : "Sciences de la santé";
				break;
			case "engeneering_computer_science":
				formattedCategory = short ? "INGI" : "Ingénierie et sciences informatiques";
				break;
			case "physics_mathematic_sciences":
				formattedCategory = short ? "SPM" : "Sciences physiques et mathématiques";
				break;
			case "earth_environment_sciences":
				formattedCategory = short ? "STE" : "Sciences de la Terre et de l'environnement";
				break;
			case "human_social_sciences":
				formattedCategory = short ? "SH" : "Sciences humaines et sociales";
				break;
			case "life_sciences":
				formattedCategory = short ? "SV" : "Sciences de la vie";
				break;
			default:
				break;
		}
		return formattedCategory;
	};

	OnHandleInput = criterionResult => {
		const results = this.state.results;

		const grade = parseInt(criterionResult.result[Object.keys(criterionResult.result)[0]]);
		const total = parseFloat(criterionResult.total);
		const resultToSave = { grade, total };

		results[Object.keys(criterionResult.result)[0]] = resultToSave;
		this.setState({ results }, () => {
			this.setState({ isComplete: this.CheckIfComplete() });
		});
	};

	/**
	 * Checks if all the criterions are filled. Stops checking if one is false
	 * @param void
	 * @return bool
	 */
	CheckIfComplete = () => {
		let isComplete = false;
		isComplete = Object.keys(this.state.results).every(result => {
			return !isEmpty(this.state.results[result]);
		});
		return isComplete;
	};

	SaveResults = () => {
		const finalId = this.props.auth.user.finalId;
		const judgeNumber = this.props.auth.user.number;
		const projectNumber = this.props.project.selectedProject.number;
		const period = this.props.location.state.period;
		const isComplete = this.state.isComplete;
		if (
			isEmpty(finalId) ||
			isEmpty(judgeNumber) ||
			isEmpty(projectNumber) ||
			isEmpty(period) ||
			isEmpty(this.state.results)
		) {
			console.log("ERROR SAVE RESULTS | Unable to save result. Undefined element");
			return false;
		}
		this.props.SaveResult(
			finalId,
			judgeNumber,
			projectNumber,
			period,
			this.state.results,
			isComplete,
			this.props.history
		);
	};

	render() {
		const project = this.props.project.selectedProject;
		const sections = this.state.grid.sections.map((section, index) => {
			return (
				<EvaluationSection
					section={section}
					key={index}
					isComplete={this.state.isComplete}
					OnHandleInput={this.OnHandleInput}
				/>
			);
		});
		return (
			<Fragment>
				<div className="container">
					<div className="row">
						<div className="col-md-8 mx-auto text-center">
							<h1>Évaluation du projet {this.props.match.params[0]}</h1>
						</div>
					</div>

					<div className="row">
						<div className="col-md-9 mx-auto text-center">
							<h4>{project && project.information.projectInformation.title}</h4>
						</div>
						<div className="col-md-8 mx-auto text-center">
							Type de projet:
							{project &&
								this.FormatType(project.information.projectInformation.type)}
						</div>
						<div className="col-md-8 mx-auto text-center">
							Catégorie:
							{project &&
								this.FormatCategory(
									project.information.projectInformation.category
								)}
						</div>
					</div>
					{sections}
					<div className="row">
						<div className="col-md-6 mx-auto my-5">
							<div
								className={classnames(
									"btn",
									"btn-block",
									"btn-reseau",
									{
										"btn-success ": this.state.isComplete
									},
									{
										"btn-danger": !this.state.isComplete
									}
								)}
								onClick={this.SaveResults}
							>
								{this.state.isComplete ? (
									<div>
										<span>
											<i className="fas fa-save" />
										</span>
										&emsp; Jugement complet. Enregistrer
									</div>
								) : (
									<div>
										<span>
											<i className="fas fa-exclamation-triangle" />
										</span>
										&emsp; Jugement incomplet. Enregistrer malgré tout.
									</div>
								)}
							</div>
						</div>
						<div className="col-md-6 mx-auto my-5">
							<div className="btn btn-reseau btn-block">
								<Link to="/mon-jugement">
									<span>
										<i className="fas fa-times" />
									</span>
									&emsp; Ne pas enregister les modifications
								</Link>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	project: state.project,
	error: state.error,
	message: state.message
});
export default connect(
	mapStateToProps,
	{ GetProjectInfos, ClearProjectInfos, SaveResult }
)(EvaluationGrid);
