import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { SaveFinalPairing } from "../../../store/actions/finalActions";
import { ClearErrors } from "../../../store/actions/errorActions";
import { ClearResponse } from "../../../store/actions/responseActions";

import isEmpty from "../../../validation/isEmpty";

class PairingFileImportation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pairingInfos: {},
			file: "",
			modal: ""
		};
	}

	OnFileSelect = e => {
		this.setState({ file: e.target.files[0] });
	};

	OnImportData = () => {
		if (this.state.file === "" || this.state.file === undefined) return;
		var reader = new FileReader();
		var that = this;
		reader.onload = event => {
			let textData = reader.result;
			that.setState({ pairingInfos: textData }, () => {
				this.ConvertTextToJson();
			});
		};
		reader.readAsText(this.state.file);
	};

	ConvertTextToJson = () => {
		const pairingByProjects = {};
		const pairingByJudges = {};

		const string = this.state.pairingInfos;

		string.split(/\n|\r\n/).map((line, index) => {
			//Reads only lines with pairing infos
			if (
				line.substr(0, 1) === "P" ||
				line.substr(0, 1) === "#" ||
				line.substr(0, 1) === "" ||
				line.substr(0, 1) === "&"
			)
				return null;
			const array = line.split(/;/);
			//console.log("array", array);

			//If object doesnt exist, initialize project pairing objects
			if (!pairingByProjects.hasOwnProperty(array[0])) {
				pairingByProjects[array[0]] = {};
			}

			pairingByProjects[array[0]][array[2]] = {
				project: parseInt(array[0]),
				period: parseInt(array[2]),
				judge: array[3] !== undefined ? parseInt(array[3]) : undefined
			};

			//If object doesnt exist, initialize judge pairing objects
			if (array[3] !== undefined) {
				if (!pairingByJudges.hasOwnProperty(array[3])) {
					pairingByJudges[array[3]] = {};
					pairingByJudges[array[3]][array[2]] = {
						project: parseInt(array[0]),
						period: parseInt(array[2]),
						judge: parseInt(array[3])
					};
				} else {
					pairingByJudges[array[3]][array[2]] = {
						project: parseInt(array[0]),
						period: parseInt(array[2]),
						judge: parseInt(array[3])
					};
				}
			}
			return array;
		});

		const pairing = {
			pairingByProjects,
			pairingByJudges
		};

		//Reset results
		const results = this.ResetResults();

		const finalInfos = { _id: this.props.finalId, pairing, results };
		this.props.SaveFinalPairing(finalInfos);
	};

	ResetResults = () => {
		const results = {};
		this.props.project.projectsList.map(project => {
			if (project.number !== undefined) {
				results[project.number] = {};
			}
			return true;
		});
		return results;
	};

	OnSubmit = e => {
		e.preventDefault();
	};

	render() {
		const { action, errors } = this.props;
		const selectedFinal = this.props.final.selectedFinal;

		const emptyAlert = isEmpty(selectedFinal.pairing) ? (
			<div className="alert alert-warning mx-auto text-center">
				<span>
					<i className="fas fa-exclamation-triangle" />
					&emsp; Aucun pairage n'est actuellement enregistré pour cette finale
				</span>
			</div>
		) : (
			<div className="alert mx-auto text-center">
				<span>
					<i className="fas fa-check" />
					&emsp; Pairage importé
				</span>
			</div>
		);

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
				<div className="p-3">
					<h4 className="section-header">
						<i className="fas fa-plus-circle" />
						{"  "}
						Importer le fichier de pairage
					</h4>
					{emptyAlert}
					<form onSubmit={this.OnSubmit}>
						<div className="row text-center">
							<div className="col">
								<label
									htmlFor="pairingJsonImport"
									className="btn btn-accent2 btn-lg btn-block"
								>
									Sélectionner le fichier
								</label>
								<input
									id="pairingJsonImport"
									name="file"
									type="file"
									accept="text/plain"
									multiple={false}
									onChange={this.OnFileSelect}
									style={{ display: "none" }}
								/>
								<small>
									<i className="fas fa-exclamation-circle fa-sm" /> Veuiller
									choisir le fichier .txt depuis le logiciel Répartition dans le
									dossier version
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
							<div className="col-md-12 mx-auto">
								<input
									type="submit"
									className="btn btn-block"
									name="jsonSubmit"
									id="jsonSubmit"
									value="Assigner des juges aux projets"
									onClick={this.OnImportData}
								/>
								<p>
									<small>
										Attention, ceci risque réinitialise la finale et efface les
										jugements effectués!
									</small>
								</p>
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
	action: state.action,
	errors: state.errors,
	project: state.project,
	final: state.final
});
export default connect(
	mapStateToProps,
	{
		SaveFinalPairing,
		ClearResponse,
		ClearErrors
	}
)(PairingFileImportation);
