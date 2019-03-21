import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { SaveFinalPairing } from "../../../store/actions/finalActions";
import { ClearErrors } from "../../../store/actions/errorActions";
import { ClearResponse } from "../../../store/actions/responseActions";

import isEmpty from "../../../validation/isEmpty";

class ReportsJudgingImportation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reportsResults: {},
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
			that.setState({ reportsResults: textData }, () => {
				this.ConvertCSVToJson();
			});
		};
		reader.readAsText(this.state.file);
	};

	ConvertCSVToJson = () => {
		const reportsResults = {};

		const string = this.state.reportsResults;

		string.split(/\n|\r\n/).map((line, index) => {
			//Reads only lines with pairing infos
			if (
				line.substr(0, 1) === "P" ||
				line.substr(0, 1) === "#" ||
				line.substr(0, 1) === "" ||
				line.substr(0, 1) === "&"
			)
				return;

			if (!parseInt(line.substr(0, 1))) {
				return;
			}
			const array = line.split(/;/);
			//console.log("array", array);

			//If object doesnt exist, initialize project result objects
			if (!reportsResults.hasOwnProperty(array[0])) {
				reportsResults[array[0]] = {};
			}

			reportsResults[array[0]] = {
				project: parseInt(array[0]),
				reportResult: parseFloat(array[1])
			};
			return array;
		});

		console.log("results", reportsResults, this.props.finalId);

		const finalInfos = { _id: this.props.finalId, reportsResults };
		this.props.SaveFinalPairing(finalInfos);
		this.props.HideModal();
	};

	OnSubmit = e => {
		e.preventDefault();
	};

	render() {
		const { action, errors } = this.props;
		const selectedFinal = this.props.final.selectedFinal;

		const emptyAlert = isEmpty(selectedFinal.reportsResults) ? (
			<div className="alert alert-warning mx-auto text-center">
				<span>
					<i className="fas fa-exclamation-triangle" />
					&emsp; Aucune note de rapport écrit n'est enregistrée
				</span>
			</div>
		) : (
			<div className="alert mx-auto text-center">
				<span>
					<i className="fas fa-check" />
					&emsp; Rapports écrits importés
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
						Importer le fichier csv de notes de rapports écrits
					</h4>
					{emptyAlert}
					<form onSubmit={this.OnSubmit}>
						<div className="row text-center">
							<div className="col">
								<label
									htmlFor="CSVImport"
									className="btn btn-accent2 btn-lg btn-block"
								>
									Sélectionner le fichier
								</label>
								<input
									id="CSVImport"
									name="file"
									type="file"
									accept="text/csv"
									multiple={false}
									onChange={this.OnFileSelect}
									style={{ display: "none" }}
								/>
								<small>
									<i className="fas fa-exclamation-circle fa-sm" /> Veuiller
									choisir le fichier .csv depuis le fichier Rapp
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
									name="csvSubmit"
									id="csvSubmit"
									value="Importer les notes de rapports écrits"
									onClick={this.OnImportData}
								/>
								<p>
									<small>
										Attention, ceci risque écrasera les notes de rapports écrits
										existantes
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
	final: state.final
});
export default connect(
	mapStateToProps,
	{ SaveFinalPairing, ClearErrors, ClearResponse }
)(ReportsJudgingImportation);
