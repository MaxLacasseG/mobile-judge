import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import NewFinalModal from "./NewFinalModal";

import { CreateFinal } from "../../../store/actions/finalActions";
import { CreateJudge, ClearJudgesList } from "../../../store/actions/judgeActions";
import { CreateProject, ClearProjectsList } from "../../../store/actions/projectActions";
import { ClearErrors } from "../../../store/actions/errorActions";
import { ClearResponse } from "../../../store/actions/responseActions";

import isEmpty from "../../../validation/isEmpty";
import PropTypes from "prop-types";

class FinalJSONImport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			finalInfos: {},
			file: "",
			modal: ""
		};
	}

	ShowCreateFinalModal = admin => {
		const modal = (
			<NewFinalModal
				finalInfos={this.state.finalInfos}
				CreateFinal={this.CreateFinal}
				CreateJudge={this.CreateJudge}
				CreateProject={this.CreateProject}
				ClearModal={this.ClearModal}
				ClearJudgesList={this.props.ClearJudgesList}
				ClearProjectsList={this.props.ClearProjectsList}
			/>
		);
		this.setState({ modal }, () => {
			//Show modal box
			document.getElementById("createModalBtn").click();
		});
	};
	ClearModal = () => {
		this.setState({ modal: "" });
	};

	CreateFinal = finalInfos => {
		const id = this.props.auth.user.id;
		const isAdmin = this.props.auth.user.isAdmin;
		this.props.CreateFinal(finalInfos, id, isAdmin);
	};

	CreateJudge = judgeInfos => {
		this.props.CreateJudge(judgeInfos);
	};

	CreateProject = projectInfos => {
		this.props.CreateProject(projectInfos);
	};

	OnFileSelect = e => {
		this.setState({ file: e.target.files[0] });
	};

	OnImportData = () => {
		if (this.state.file === "" || this.state.file === undefined) return;
		var reader = new FileReader();
		var that = this;
		reader.onload = event => {
			let jsonData = reader.result;
			jsonData = JSON.parse(jsonData);
			that.setState({ finalInfos: jsonData }, () => {
				this.ShowCreateFinalModal();
			});
		};
		reader.readAsText(this.state.file);
	};
	OnSubmit = e => {
		e.preventDefault();
	};

	render() {
		const { action, errors } = this.props;
		const errorMessage = (
			<div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
				{errors.msg}
				<button
					type="button"
					className="close"
					data-dismiss="alert"
					aria-label="Close"
					onClick={this.props.ClearErrors}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		);
		const createFinalSuccessAlert = (
			<div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
				Finale ajoutée
				<button
					type="button"
					className="close"
					data-dismiss="alert"
					aria-label="Close"
					onClick={this.props.ClearResponse}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		);

		return (
			<Fragment>
				{this.state.modal}
				<div className="p-5">
					<h4 className="section-header">
						<i className="fas fa-plus-circle" />
						{"  "}
						Importer une finale
					</h4>
					<form onSubmit={this.OnSubmit}>
						<div className="row text-center">
							<div className="col">
								<label
									htmlFor="finalJsonImport"
									className="btn btn-accent2 btn-lg btn-block"
								>
									Sélectionner le fichier
								</label>
								<input
									id="finalJsonImport"
									name="file"
									type="file"
									accept="application/json"
									multiple={false}
									onChange={this.OnFileSelect}
									style={{ display: "none" }}
								/>
								<small>
									<i className="fas fa-exclamation-circle fa-sm" /> Veuiller
									choisir le fichier JSON depuis SGI
								</small>
							</div>
						</div>
						<hr />
						<div className="row py-3">
							<div className="col-md-6 offset-3">
								<p>
									<small>Nom du fichier sélectionné</small>
									<br />
									{!isEmpty(this.state.file.name) ? (
										this.state.file.name
									) : (
										<em>Aucun fichier sélectionné</em>
									)}
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 offset-3">
								<input
									type="submit"
									className="btn"
									name="jsonSubmit"
									id="jsonSubmit"
									value="Démarrer l'importation"
									onClick={this.OnImportData}
								/>
							</div>
						</div>
					</form>
					<hr />
					{/* MESSAGE SECTIONS */}
					{errors.msg && errorMessage}
					{action.type === "CREATE_FINAL" && action.response === "success"
						? createFinalSuccessAlert
						: null}

					<button
						id="createModalBtn"
						className="icon-button"
						data-target="#createFinalModal"
						data-toggle="modal"
						style={{ display: "none" }}
					/>
				</div>
			</Fragment>
		);
	}
}
const mapStateToProps = state => ({
	auth: state.auth,
	action: state.action,
	errors: state.errors,
	final: state.final
});

FinalJSONImport.propTypes = {
	action: PropTypes.object.isRequired,
	errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	final: PropTypes.object.isRequired,
	CreateFinal: PropTypes.func.isRequired,
	CreateJudge: PropTypes.func.isRequired,
	CreateProject: PropTypes.func.isRequired,
	ClearResponse: PropTypes.func.isRequired,
	ClearErrors: PropTypes.func.isRequired
};

export default connect(
	mapStateToProps,
	{
		ClearResponse,
		ClearErrors,
		CreateFinal,
		CreateJudge,
		CreateProject,
		ClearJudgesList,
		ClearProjectsList
	}
)(FinalJSONImport);
