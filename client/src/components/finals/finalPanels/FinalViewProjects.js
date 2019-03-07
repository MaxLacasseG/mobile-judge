import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { SelectFinalById } from "../../../store/actions/finalActions";
import { SelectProjectsByFinalId } from "../../../store/actions/projectActions";
import { SelectJudgesByFinalId } from "../../../store/actions/judgeActions";
import FinalNav from "../../pages/partials/FinalNav";
import AttributionRow from "../../projects/AttributionRow";
import isEmpty from "../../../validation/isEmpty";
import tippy from "tippy.js";
class FinalViewProjects extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		this.props.SelectFinalById(this.props.match.params[0]);
		this.props.SelectProjectsByFinalId(this.props.match.params[0]);
		this.props.SelectJudgesByFinalId(this.props.match.params[0]);
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
		for (let i = 1; i <= 8; i++) {
			cols.push(
				<div key={i} className="col-md grid-cell-header">
					{" "}
					Période {String.fromCharCode(64 + i)}
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

	ShowProjectInfos = e => {
		const target = document.querySelector(
			`.more-infos[data-project="${e.currentTarget.dataset.project}"]`
		);
		const number = target.dataset.project;
		let project = this.props.project.projectsList.filter(project => {
			return project.number == number;
		});

		if (isEmpty(project)) return;
		project = project[0];
		const classification = project.classification;
		const { type, category, summary } = project.information.projectInformation;
		const participant1 = project.participants[0] && project.participants[0];
		const participant2 = project.participants[1] && project.participants[1];

		const container = document.createElement("div");
		const divs = ReactDOM.render(
			<div className="p-3">
				<div className="row">
					<div className="col-md-12 text-left">
						<h3>Fiche du projet</h3>
					</div>
				</div>
				<div className="row border-bottom">
					<div className="col-md-12 text-left">
						<h4>
							N<sup>o</sup>
							{project.number} | {project.information.projectInformation.title}
						</h4>
					</div>
				</div>
				{project.participants.length > 0 && (
					<Fragment>
						<div className="row pt-2">
							<div class="col-md-12 text-left">
								<h5>Équipe</h5>
							</div>
						</div>
						<div className="row border-bottom pb-2">
							<div class="col-md-12 text-left">
								{participant1 && (
									<span>
										{participant1.information.generalInformation.firstName}{" "}
										{participant1.information.generalInformation.lastName}
									</span>
								)}
								{participant2 && <span>&emsp;&amp;&emsp;</span>}
								{participant2 && (
									<span>
										{participant2.information.generalInformation.firstName}{" "}
										{participant2.information.generalInformation.lastName}
									</span>
								)}
							</div>
						</div>
					</Fragment>
				)}
				<div className="row pt-2">
					<div className="col-md-1  text-left">Type</div>
					<div class="col text-left">
						<p> {this.FormatType(type)}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-md-1  text-left">Catégorie</div>
					<div class="col text-left">
						<p> {this.FormatCategory(category)}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-md-1  text-left">Classe</div>
					<div class="col text-left">
						<p> {classification}</p>
					</div>
				</div>

				<div className="row border-top pt-2">
					<div class="col-md-12 text-left">
						<h5>Résumé</h5>
					</div>
					<div class="col-md-12 text-justify">
						<p className="text-justify">{summary}</p>
					</div>
				</div>
			</div>,
			container
		);
		tippy(target, {
			content: divs,
			placement: "top",
			arrow: true,
			maxWidth: "60%",
			inertia: true,
			boundary: "viewport"
		});
	};

	render() {
		const id = this.props.match.params[0];
		const final = this.props.final.selectedFinal;
		const projects = this.props.project.projectsList;

		const projectsList = projects.map(project => {
			const attributionByProject = isEmpty(final.pairing)
				? {}
				: final.pairing.pairingByProjects[project.number];

			return (
				<Fragment key={project.projectId}>
					<div className="projectsListItem row" data-projectrow={project.number}>
						{/** PROJECT INFOS COLUMN */}
						<div className="col-md-3 row">
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
							<div className="col-md">
								{project.information.projectInformation.title}
							</div>
							<div className="col-md-1">
								{this.FormatCategory(
									project.information.projectInformation.category,
									true
								)}
								{"  "}
								{this.FormatType(project.information.projectInformation.type, true)}
							</div>
							<div className="col-md">
								<div className="ml-1 btn btn-accent2 btn-sm">Changer le type</div>
							</div>
							<div className="col-md-1 p-0">
								<span className="text-left">
									<i
										className="fas more-infos fa-info-circle "
										data-project={project.number}
										onMouseOver={this.ShowProjectInfos}
										style={{ cursor: "pointer" }}
									/>
								</span>
							</div>
						</div>

						{/** PAIRING COLUMNS */}
						<div className="col-md row">
							<AttributionRow
								projectNumber={project.number}
								attributionByProject={attributionByProject}
								minJudges="5"
								ShowMissingJudge={this.ShowMissingJudge}
								results={final.results}
								history={this.props.history}
								match={this.props.match}
							/>
						</div>
					</div>
				</Fragment>
			);
		});

		return (
			<Fragment>
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
	{ SelectFinalById, SelectProjectsByFinalId, SelectJudgesByFinalId }
)(FinalViewProjects);
