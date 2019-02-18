import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import JudgeNav from "./JudgeNav";
import { GetJudgeProject } from "../../store/actions/judgeActions";
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
	};

	render() {
		const final = this.props.final;
		const projects = this.props.project.projectsList;
		const projectList =
			projects &&
			Object.keys(projects).map(key => {
				return (
					<div className="row mb-3 period-row p-2" key={projects[key].project}>
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
								Juger le project {projects[key].project}{" "}
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
	{ GetJudgeProject }
)(JudgeDashboard);
