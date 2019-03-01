import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import JudgeNav from "./JudgeNav";
import { GetJudgeProject } from "../../store/actions/judgeActions";
import { SelectFinalById } from "../../store/actions/finalActions";
import classnames from "classnames";
import isEmpty from "../../validation/isEmpty";
class JudgeDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: []
		};
	}
	componentDidMount = () => {
		this.props.GetJudgeProject(this.props.auth.user.finalId, this.props.auth.user.number);
		this.props.SelectFinalById(this.props.auth.user.finalId);
	};

	CheckIfIsComplete = (projectNumber, judgeNumber) => {
		const results = this.props.final.selectedFinal.results;
		let isComplete = false;

		if (isEmpty(results)) return false;
		if (!isEmpty(results[projectNumber])) {
			if (!isEmpty(results[projectNumber][judgeNumber])) {
				//console.log(results[projectNumber][judgeNumber]);
				isComplete = results[projectNumber][judgeNumber].isComplete;
			}
		}
		//console.log("isComplete",isComplete);
		return isComplete;
	};

	CheckExistingResult = (projectNumber, judgeNumber, results) => {
		//console.log(results);
		if (isEmpty(results)) return false;
		if (isEmpty(results[projectNumber])) return false;
		if (isEmpty(results[projectNumber][judgeNumber])) return false;

		if (results[projectNumber][judgeNumber].hasOwnProperty("results")) {
			return true;
		}

		return false;
	};

	ImportResults = (projectNumber, judgeNumber, results) => {
		return results[projectNumber][judgeNumber];
	};

	render() {
		const projects = this.props.project.projectsList;
		const results = this.props.final.selectedFinal.results;

		const projectList =
			projects &&
			Object.keys(projects).map(key => {
				let isComplete = this.CheckIfIsComplete(projects[key].project, projects[key].judge);

				const linkText = isComplete ? (
					<span>Projet {projects[key].project} | Jugement complété</span>
				) : (
					<span>Projet {projects[key].project} | Jugement incomplet</span>
				);
				const linkIcon = isComplete ? (
					<span>
						<i className="fas fa-check" />
					</span>
				) : null;
				return (
					<div
						className={classnames("row mb-3 period-row p-2", {
							"is-complete": isComplete
						})}
						key={projects[key].project}
					>
						<div className="col-md-1">{linkIcon}</div>
						<div className="col-md-2">
							<span className="">
								<strong>
									Période {String.fromCharCode(64 + projects[key].period)}
								</strong>
							</span>
						</div>
						<div className="col">
							<Link
								to={{
									pathname: `/projet/${projects[key].project}`,
									state: {
										period: projects[key].period,
										project: projects[key].project,
										judge: this.props.auth.user.number,
										finalId: this.props.auth.user.finalId,
										isAdmin: false,
										results: this.CheckExistingResult(
											projects[key].project,
											this.props.auth.user.number,
											results
										)
											? this.ImportResults(
													projects[key].project,
													this.props.auth.user.number,
													results
											  )
											: {}
									}
								}}
							>
								{linkText}{" "}
								<span className="ml-3">
									<i className="fas fa-sign-in-alt" />
								</span>
							</Link>
						</div>
					</div>
				);
			});

		const { gender, lastName, firstName } = this.props.auth.user.information.generalInformation;
		const number = this.props.auth.user.number;
		const judgeInformation = (
			<div className="row">
				<div className="col-12 py-2">
					<hr />
					<p className="lead py-3 text-center">
						Merci{" "}
						<strong>
							{gender === "F" ? "Mme" : gender === "M" ? "M." : null} {firstName}{" "}
							{lastName}{" "}
						</strong>
						de soutenir la relève scientifique !
					</p>
					<hr />
				</div>

				<div className="col-12">
					<h4>Instructions</h4>
				</div>
				<div className="col-12">
					<p>
						Ci-dessous sont les projets, affichés par période de jugement, que vous
						aurez à juger en tant que <strong>juge no {number}</strong>.
					</p>
					<p>
						Les projets dont le jugement est incomplet sont affichés{" "}
						<strong>en orange</strong>.
					</p>
					<p>
						Les projets dont le jugement est complet sont affichés{" "}
						<strong>en vert</strong>.
					</p>
					<p>
						Vous pouvez modifier un jugement, même s'il est complet, tant que le
						processus de jugement n'est pas terminé.
					</p>
				</div>
			</div>
		);

		const footer = (
			<footer>
				L'application <strong>Jugement mobile</strong> a été développée par le{" "}
				<a href="http://technoscience.ca" target="_blank" rel="noopener noreferrer">
					<em>Réseau Technoscience</em>
				</a>
				, &copy; 2019.
			</footer>
		);
		return (
			<div className="judge-dashboard ">
				<div className="container p-4 p-md-5">
					<JudgeNav />
					{judgeInformation}
					<hr />
					<h1>Liste des projets</h1>
					{projectList}
					{footer}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	final: state.final,
	judge: state.judge,
	project: state.project,
	error: state.error,
	message: state.message
});

export default connect(
	mapStateToProps,
	{ GetJudgeProject, SelectFinalById }
)(JudgeDashboard);
