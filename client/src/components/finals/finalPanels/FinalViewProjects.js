import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { SelectFinalById } from "../../../store/actions/finalActions";
import { SelectProjectsByFinalId } from "../../../store/actions/projectActions";

import FinalNav from "../../pages/partials/FinalNav";

class FinalViewProjects extends Component {
	componentDidMount = () => {
		this.props.SelectFinalById(this.props.match.params[0]);
		this.props.SelectProjectsByFinalId(this.props.match.params[0]);
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
		}
		return formattedCategory;
	};

	render() {
		const id = this.props.match.params[0];
		const final = this.props.final.selectedFinal;
		const projects = this.props.project.projectsList;

		const projectsList = projects.map(project => {
			return (
				<Fragment key={project.projectId}>
					<div className="projectsListItem row">
						<div className="col-md-1">
							<strong>
								{project.number === null ? (
									<i
										className="fas fa-exclamation-triangle text-danger"
										title="Numéro non attribué"
									/>
								) : (
									project.number
								)}
							</strong>
						</div>
						<div className="col-md-7">
							{project.information.projectInformation.title}{" "}
						</div>
						<div className="col-md-1">
							{this.FormatCategory(
								project.information.projectInformation.category,
								true
							)}
						</div>
						<div className="col-md-1">
							{this.FormatType(project.information.projectInformation.type, true)}
						</div>
						<div className="col-md">
							<strong>
								<i className="fas fa-ellipsis-v" />
							</strong>
						</div>
					</div>
				</Fragment>
			);
		});

		return (
			<Fragment>
				<FinalNav pageTitle="Finale - Vue par projets" id={id} finalName={final.longName} />
				<div className="p-5 ">
					<div className="row py-5">
						<div className="col-md-6">{final.longName}</div>
					</div>
					<div className="row">
						{/* Left column */}
						<div className="col-2">
							<div className="d-flex flex-column">{projectsList}</div>
						</div>
						<div className="col-10" />
					</div>
				</div>
			</Fragment>
		);
	}
}
const mapStateToProps = state => ({
	final: state.final,
	project: state.project
});

export default connect(
	mapStateToProps,
	{ SelectFinalById, SelectProjectsByFinalId }
)(FinalViewProjects);
