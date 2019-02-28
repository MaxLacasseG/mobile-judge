import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { SelectFinalById } from "../../../store/actions/finalActions";
import { SelectProjectsByFinalId } from "../../../store/actions/projectActions";
import tippy from "tippy.js";
import FinalNav from "../../pages/partials/FinalNav";
import AttributionRow from "../../projects/AttributionRow";
import isEmpty from "../../../validation/isEmpty";
class FinalViewProjects extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		this.props.SelectFinalById(this.props.match.params[0]);
		this.props.SelectProjectsByFinalId(this.props.match.params[0]);

		this.InitializeTooltip();
	};

	InitializeTooltip = () => {
		const template = document.getElementById("example");

		const tippyInstances = tippy(".grid-cell", {
			arrow: true,
			content: template.innerHTML,
			interactive: true
		});

		for (let tippy of tippyInstances) {
			let project =
				tippy.reference.attributes["data-project"] &&
				tippy.reference.attributes["data-project"].value;
			let judge =
				tippy.reference.attributes["data-judge"] &&
				tippy.reference.attributes["data-judge"].value;

			let results =
				this.props.final.selectedFinal.results[project] &&
				this.props.final.selectedFinal.results[project][judge];

			let text = "";

			if (results === undefined) {
				text = "Aucun résultat";
			} else {
				text = "<div>";
				Object.keys(results.results).map(key => {
					text += `${key} ${results.results[key].grade}<br/>`;
					return true;
				});
				text += `total ${results.total.toFixed(4)}`;
				text += "</div>";
			}

			tippy.setContent(text);
		}
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

	CreateTableHeader = () => {
		let cols = [];
		for (let i = 0; i < 8; i++) {
			cols.push(
				<div key={i} className="col-md grid-cell-header">
					{" "}
					Période {String.fromCharCode(65 + i)}
				</div>
			);
		}
		return cols;
	};

	ShowMissingJudge = projectNumber => {
		const elem = document.querySelector(`[data-projectrow='${projectNumber.toString()}']`);
		elem.classList.add("missing-judge");
		elem.setAttribute("title", "Le nombre de juge est insuffisant pour ce projet");
	};

	render() {
		const id = this.props.match.params[0];
		const final = this.props.final.selectedFinal;
		const projects = this.props.project.projectsList;

		const template = (
			<div id="example" style={{ display: "none" }}>
				<strong>Bolded content</strong>
			</div>
		);
		const projectsList = projects.map(project => {
			const attributionInfos = isEmpty(final.pairing)
				? {}
				: final.pairing.pairingByProjects[project.number];

			return (
				<Fragment key={project.projectId}>
					<div className="projectsListItem row" data-projectrow={project.number}>
						{/** PROJECT INFOS COLUMN */}
						<div className="col-md-3 row">
							<div className="col-1">
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
							<div className="col-md">
								{project.information.projectInformation.title}
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
							<div className="col-md-1">
								<strong>
									<i className="fas fa-ellipsis-v" />
								</strong>
							</div>
						</div>

						{/** PAIRING COLUMNS */}
						<div className="col-md row">
							<AttributionRow
								number={project.number}
								attributionInfos={attributionInfos}
								minJudges="5"
								ShowMissingJudge={this.ShowMissingJudge}
								results={final.results}
							/>
						</div>
					</div>
				</Fragment>
			);
		});

		return (
			<Fragment>
				{template}
				<FinalNav pageTitle="Finale - Vue par projets" id={id} finalName={final.longName} />
				<div className="p-5 ">
					{/* HEADER */}
					<div className="row">
						<div className="col-md-3 row" />
						<div className="col-md row">{this.CreateTableHeader()}</div>
					</div>
					{projectsList}
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
