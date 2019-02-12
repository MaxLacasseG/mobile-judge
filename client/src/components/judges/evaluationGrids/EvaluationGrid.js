import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import EvaluationSection from "./EvaluationSection";
import { ClearProjectInfos, GetProjectInfos } from "../../../store/actions/projectActions";
import {
	highExperimentationGrid,
	highschoolConceptionGrid,
	highVulgarisationGrid
} from "../../../enums/grids";
import isEmpty from "../../../validation/isEmpty";

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
			result: {}
		};
	}
	componentDidMount = () => {
		console.log(this.props.auth.user.finalId, this.props.number);
		this.props.GetProjectInfos(this.props.auth.user.finalId, this.props.number);
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
					this.setState({ grid: this.SetType(this.state.type) });
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

	OnHandleInput = e => {
		const result = this.state.result;
		result[e.target.name] = e.target.value;
		this.setState({ result });
	};

	render() {
		const project = this.props.project.selectedProject;
		const sections = this.state.grid.sections.map((section, index) => {
			return (
				<EvaluationSection
					section={section}
					key={index}
					OnHandleInput={this.OnHandleInput}
				/>
			);
		});
		return (
			<Fragment>
				<div className="row">
					<div className="col-md-6 mx-auto">{this.state.grid.name}</div>
				</div>
				{sections}
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
	{ GetProjectInfos, ClearProjectInfos }
)(EvaluationGrid);
