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
				console.log(results[projectNumber][judgeNumber]);
				isComplete = results[projectNumber][judgeNumber].isComplete;
			}
		}
		console.log(isComplete);
		return isComplete;
	};

	render() {
		const projects = this.props.project.projectsList;
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
								<strong>Période {projects[key].period}</strong>
							</span>
						</div>
						<div className="col">
							<Link
								to={{
									pathname: `/projet/${projects[key].project}`,
									state: { period: projects[key].period }
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

		return (
			<div className="judge-dashboard ">
				<div className="container p-4 p-md-5">
					<JudgeNav />
					<h1>Liste des projets</h1>
					{projectList}
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
