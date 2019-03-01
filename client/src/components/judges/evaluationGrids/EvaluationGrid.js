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
			results: null,
			isComplete: false
		};
	}
	componentDidMount = () => {
		console.log(this.props.location.state.finalId, this.props.location.state.project);
		this.props.GetProjectInfos(
			this.props.location.state.finalId,
			this.props.location.state.project
		);

		if (!isEmpty(this.props.location.state.results)) {
			this.setState({ results: this.props.location.state.results.results }, () => {
				this.setState({ isComplete: this.CheckIfComplete() });
				if (this.props.location.state.isAdmin) {
					this.setState({ total: this.CalculateTotal() });
				}
			});
		}
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
					return true;
				});
				prefix++;
				return true;
			});
			return true;
		});

		if (!isEmpty(this.props.location.state.results)) {
			for (let existingResult in this.props.location.state.results.results) {
				results[existingResult] = this.props.location.state.results.results[existingResult];
			}
		}

		this.setState({ results }, () => {
			this.setState({ isComplete: this.CheckIfComplete() });
		});
	};

	ResetResults = () => {
		if (!this.props.location.state.isAdmin) return;
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
		//console.log("OnHandleInput - criterion result", criterionResult);
		const results = this.state.results;

		const grade = parseInt(criterionResult.result[Object.keys(criterionResult.result)[0]]);
		const total = parseFloat(criterionResult.total);

		//Creates an object that contains all the grades and total
		const resultToSave = { grade, total };
		results[Object.keys(criterionResult.result)[0]] = resultToSave;

		//Save to state and color border if is complete
		this.setState({ results }, () => {
			this.setState({ isComplete: this.CheckIfComplete() });
		});

		//SHOW TOTAL ONLY FOR ADMIN
		if (this.props.location.state.isAdmin) {
			this.setState({ total: this.CalculateTotal() });
		}
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
		//console.log("isGridComplete", isComplete, this.state.results);
		return isComplete;
	};

	CalculateTotal = () => {
		const results = this.state.results;
		let endTotal = 0;
		for (let criterion in results) {
			if (isEmpty(results[criterion].total)) continue;
			endTotal += results[criterion].total;
		}
		return endTotal;
	};

	SaveResults = () => {
		const finalId = this.props.location.state.finalId;
		const judgeNumber = this.props.location.state.judge;
		const projectNumber = this.props.location.state.project;
		const period = this.props.location.state.period;
		const isComplete = this.CheckIfComplete();
		const isAdmin = this.props.location.state.isAdmin;
		const results = this.state.results;
		if (
			isEmpty(finalId) ||
			isEmpty(judgeNumber) ||
			isEmpty(projectNumber) ||
			isEmpty(period) ||
			isEmpty(results)
		) {
			//console.log("ERROR SAVE RESULTS | Unable to save result. Undefined element");
			return false;
		}

		const total = this.CalculateTotal();

		this.props.SaveResult(
			finalId,
			judgeNumber,
			projectNumber,
			period,
			results,
			total,
			isComplete,
			isAdmin,
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
					results={this.state.results}
					OnHandleInput={this.OnHandleInput}
				/>
			);
		});
		return (
			<Fragment>
				<div className="bg py-4">
					<div className="container">
						<div className="row">
							<div className="col-md-8 mx-auto text-center">
								<h1>Évaluation du projet {this.props.location.state.project}</h1>
							</div>
						</div>

						<div className="row">
							<div className="col-md-9 mx-auto text-center text-uppercase">
								<h4>
									<strong>
										{project && project.information.projectInformation.title}
									</strong>
								</h4>
							</div>
							<div className="col-md-8 mx-auto text-center">
								{project && (
									<h5>
										{this.FormatType(
											project.information.projectInformation.type
										)}
									</h5>
								)}
							</div>
							<div className="col-md-8 mx-auto text-center">
								{project && (
									<h5>
										{this.FormatCategory(
											project.information.projectInformation.category
										)}
									</h5>
								)}
							</div>
							{this.props.location.state.isAdmin && (
								<div className="col-md-8 mx-auto text-center">
									<h6>{this.state.total && this.state.total.toFixed(4)} / 100</h6>
									<Link
										to={`/admin/finale/${
											this.props.location.state.finalId
										}/vue-projets`}
										className="text-link"
									>
										<i className="fas fa-reply" /> Retour aux projets
									</Link>
								</div>
							)}
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
									{this.props.location.state.isAdmin ? (
										<Link
											to={`/admin/finale/${
												this.props.location.state.finalId
											}/vue-projets`}
										>
											<span>
												<i className="fas fa-times" />
											</span>
											&emsp; Ne pas enregister les modifications
										</Link>
									) : (
										<Link to="/mon-jugement">
											<span>
												<i className="fas fa-times" />
											</span>
											&emsp; Ne pas enregister les modifications
										</Link>
									)}
								</div>
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
