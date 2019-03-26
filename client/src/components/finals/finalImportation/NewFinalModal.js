import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import regionList from "../../../enums/regions";
/**
 * @props CreateFinal    function    Updates the admin profile
 * @props ClearModal                    function    Reset modal state in parent
 * @props final                         object      the final
 */
class NewFinalModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			event: {},
			participants: {},
			projects: {},
			judges: {},
			volet: "",
			organization: ""
		};
		this.initialState = this.state;
	}

	//#region LIFE CYCLE METHODS
	componentDidMount = () => {
		this.SetFinalInfo(this.props.finalInfos);
	};
	componentWillUnmount = () => {};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.errors !== this.props.errors) {
			if (this.props.errors.hasOwnProperty("msg")) {
				this.CloseModal();
			}
		}
		if (prevProps.action !== this.props.action) {
			if (
				this.props.action.type === "CREATE_FINAL" &&
				this.props.action.response === "success"
			) {
				this.CloseModal();
			}
		}
	};

	//#endregion

	//#region COMPONENT METHODS
	SetFinalInfo = finalInfos => {
		this.setState(finalInfos);
	};

	FormatFinalInfos = () => {
		//FORMATS EVENT
		const eventFieldsToKeep = [
			"_id",
			"eventDate",
			"location",
			"longName",
			"shortName",
			"program",
			"region",
			"level",
			"isSuperExpo"
		];
		const newEvent = this.CopyObject(this.state.event, eventFieldsToKeep);
		newEvent.adminId = this.props.auth.user.id;
		console.log("NEW EVENT", newEvent);

		//Add all the judges ids to the event
		newEvent.judges = this.state.judges.map(judge => {
			return judge._id;
		});

		//Add all the projects ids to the event
		newEvent.projects = this.state.projects.map(project => {
			return project._id;
		});

		//FORMATS JUDGES
		const newJudgesList = this.state.judges.map(judge => {
			const newJudge = {};
			newJudge.number = judge.number;
			newJudge.information = this.CopyObject(judge.information, [
				"education",
				"generalInformation",
				"judgingPreference",
				"judgingExperience",
				"work"
			]);
			newJudge.judgeId = judge._id;
			newJudge.finalId = this.state.event._id;
			return newJudge;
		});

		//FORMATS PROJECTS & CREATE RESULT OBJECT
		const results = {};
		const newProjectsList = this.state.projects.map(project => {
			project.participants = this.state.participants.filter(participant => {
				return participant.project === project._id;
			});

			project.participants = project.participants.map(participant => {
				return this.CopyObject(participant, ["_id", "information"]);
			});
			project.projectId = project._id;
			project.finalId = this.state.event._id;

			if (project.number !== undefined) {
				results[project.number] = {};
			}

			return this.CopyObject(project, [
				"projectId",
				"classification",
				"participants",
				"information",
				"number",
				"finalId"
			]);
		});

		newEvent.results = results;

		//RETURN THE OBJECTS
		const newFinal = {
			event: newEvent,
			judges: newJudgesList,
			projects: newProjectsList
		};

		return newFinal;
	};

	CreateFinal = e => {
		//CREATES A UNIQUE CHARACTER FOR JUDGES PASSWORD
		const specialCharactList = ["!", "$", "*", "+"];
		const specialCharacter =
			specialCharactList[Math.floor(Math.random() * specialCharactList.length)];

		//CLEAR REDUCER FIRST
		this.props.ClearJudgesList();
		this.props.ClearProjectsList();

		const that = this;
		const newFinal = this.FormatFinalInfos();
		newFinal.event.specialCharacter = specialCharacter;
		this.props.CreateFinal(newFinal.event);

		newFinal.judges.map(judge => {
			judge.specialCharacter = specialCharacter;
			that.props.CreateJudge(judge);
			return null;
		});

		newFinal.projects.map(project => {
			that.props.CreateProject(project);
			return null;
		});
	};

	SaveFinal = () => {};

	CloseModal = () => {
		document.getElementById("closeModalBtn").click();
	};

	ClearForm = () => {
		this.setState(this.initialState);

		//Destroys the modal object via the parent
		this.props.ClearModal();
	};

	OnSubmit = e => {
		e.preventDefault();
	};
	OnChange = e => {
		const event = this.state.event;
		event[e.target.name] = e.target.value;
		this.setState({ event });
	};

	OnCheck = e => {
		const event = this.state.event;
		event[e.target.name] = e.target.checked;
		this.setState({ event });
	};

	OnSelect = e => {
		const event = this.state.event;
		event[e.target.name] = e.target.selectedOptions[0].value;
		this.setState({ event });
	};
	//#endregion

	//#region UTILS METHODS
	CopyObject = (obj, fields) => {
		var newObj = {};
		fields.map(field => {
			if (obj.hasOwnProperty(field)) {
				newObj[field] = obj[field];
			}
			return field;
		});

		return newObj;
	};
	RenderDate = date => {
		return new Date(date).toLocaleDateString("fr-CA", { timeZone: "UTC" });
	};
	//#endregion

	//#region RENDER
	render() {
		const errors = this.props.errors;
		const { event, judges, participants, projects } = this.state;

		const organizationOptions = regionList.map(org => {
			return (
				<option value={org.id} key={org.id}>
					{org.name}
				</option>
			);
		});

		return (
			<Fragment>
				<div className="container">
					<div
						className="modal fade"
						id="createFinalModal"
						role="dialog"
						data-backdrop="static"
						data-keyboard="false"
					>
						<div className="modal-dialog modal-lg">
							<div className="modal-content">
								<div className="modal-body">
									{/* ======== */}
									{/* FORM BEGINNING */}
									{/* ======== */}
									<form onSubmit={this.OnSubmit}>
										<div className="row">
											<div className="col-md-12">
												<h5>Confirmation des informations</h5>
											</div>
											<div className="form-group col-md-12">
												<label htmlFor="finalName">Nom de la finale</label>
												<input
													type="text"
													className="form-control"
													name="finalName"
													id="finalName"
													defaultValue={event ? event.longName : ""}
													disabled="disabled"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="finalName">Date de début</label>
												<input
													type="text"
													className="form-control"
													name="finalName"
													id="finalName"
													value={
														event
															? this.RenderDate(event.eventDateStart)
															: ""
													}
													disabled="disabled"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="finalName">Date de fin</label>
												<input
													type="text"
													className="form-control"
													name="finalName"
													id="finalName"
													value={
														event
															? this.RenderDate(event.eventDateEnd)
															: ""
													}
													disabled="disabled"
												/>
											</div>
											<hr />
											<div className="form-group col-md-4">
												<label htmlFor="finalName">
													Nb de participants
												</label>
												<input
													type="text"
													className="form-control"
													name="finalName"
													id="finalName"
													value={
														participants
															? participants.length + " participants"
															: ""
													}
													disabled="disabled"
												/>
											</div>
											<div className="form-group col-md-4">
												<label htmlFor="finalName">Nb de projets</label>
												<input
													type="text"
													className="form-control"
													name="finalName"
													id="finalName"
													value={
														projects ? projects.length + " projets" : ""
													}
													disabled="disabled"
												/>
											</div>
											<div className="form-group col-md-4">
												<label htmlFor="finalName">Nb de juges</label>
												<input
													type="text"
													className="form-control"
													name="finalName"
													id="finalName"
													value={judges ? judges.length + " juges" : ""}
													disabled="disabled"
												/>
											</div>
										</div>
										<div className="form-group">
											<label htmlFor="organization">Organisme régional</label>
											<select
												className={classnames(
													"form-control custom-select",
													{
														"is-invalid": errors.organization
													}
												)}
												name="organization"
												id="organization"
												value={this.state.event.region}
												onChange={this.OnSelect}
												disabled={true}
											>
												<option value={""}>Choisir un organisme</option>
												{organizationOptions}
											</select>
											{errors.organization && (
												<div className="invalid-feedback">
													{errors.organization}
												</div>
											)}
										</div>
										<hr />
										<div className="col-md-12">
											<h5>
												<i className="fas fa-exclamation-triangle text-danger" />
												Veuillez compléter les informations suivantes
											</h5>
										</div>
										<div className="col-md-12 form-group">
											<label htmlFor="shortName">
												Nom de la finale pour mobile (60 caractères max)
											</label>
											<input
												type="text"
												className="form-control"
												name="shortName"
												id="shortName"
												placeholder="Maximum 60 caractères"
												onChange={this.OnChange}
												maxLength="60"
											/>
										</div>
										<div className="col-md-12 form-group">
											<div className="custom-control custom-radio">
												<input
													className={classnames("custom-control-input", {
														"is-invalid": errors.level
													})}
													type="radio"
													name="level"
													id="elementaryLvl"
													value="elementary"
													onChange={this.OnChange}
												/>
												<label
													className="custom-control-label"
													htmlFor="elementaryLvl"
												>
													Volet primaire
												</label>
											</div>
											<div className="custom-control custom-radio">
												<input
													className={classnames(
														"custom-control-input mb-2",
														{
															"is-invalid": errors.level
														}
													)}
													type="radio"
													name="level"
													id="highschoolLvl"
													value="highschool"
													onChange={this.OnChange}
												/>
												<label
													className="custom-control-label"
													htmlFor="highschoolLvl"
												>
													Volet secondaire/collégial
												</label>
												{errors.level && (
													<div className="invalid-feedback">
														{errors.level}
													</div>
												)}
											</div>
											{this.props.auth.user.type === "SUPER_ADMIN" && (
												<div className="custom-control custom-checkbox">
													<input
														className={classnames(
															"custom-control-input mb-2",
															{
																"is-invalid": errors.isSuperExpo
															}
														)}
														type="checkbox"
														name="isSuperExpo"
														id="superLvl"
														value={true}
														onChange={this.OnCheck}
													/>
													<label
														className="custom-control-label"
														htmlFor="superLvl"
													>
														Super expo-sciences
													</label>
													{errors.isSuperExpo && (
														<div className="invalid-feedback">
															{errors.isSuperExpo}
														</div>
													)}
												</div>
											)}
										</div>

										<button
											className="btn mr-3"
											type="button"
											onClick={this.CreateFinal}
										>
											<i className="fas fa-save" /> Créer la finale
										</button>
										<button
											id="closeModalBtn"
											className="btn btn-default"
											data-dismiss="modal"
											onClick={this.ClearForm}
										>
											<i className="fas fa-times" /> Annuler
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
//#endregion

const mapStateToProps = state => ({
	auth: state.auth,
	action: state.action,
	errors: state.errors,
	final: state.final
});

NewFinalModal.propTypes = {
	finalInfos: PropTypes.object.isRequired,
	CreateFinal: PropTypes.func.isRequired,
	ClearModal: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(NewFinalModal);
