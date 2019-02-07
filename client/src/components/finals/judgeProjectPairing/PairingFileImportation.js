import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { SaveFinalPairing } from "../../../store/actions/finalActions";
import { ClearErrors } from "../../../store/actions/errorActions";
import { ClearResponse } from "../../../store/actions/responseActions";

import isEmpty from "../../../validation/isEmpty";
import PropTypes from "prop-types";

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
		const pairing = {};
		const string = this.state.pairingInfos;

		string.split(/\n|\r\n/).map((line, index) => {
			if (
				line.substr(0, 1) === "P" ||
				line.substr(0, 1) === "#" ||
				line.substr(0, 1) === "" ||
				line.substr(0, 1) === "&"
			)
				return null;
			const array = line.split(/;/);

			if (!pairing.hasOwnProperty(array[0])) {
				pairing[array[0]] = {};
			}

			pairing[array[0]][array[2]] = {
				project: parseInt(array[0]),
				period: parseInt(array[2]),
				judge: array[3] !== undefined ? parseInt(array[3]) : undefined
			};

			return array;
		});
		console.log(pairing);
		const finalInfos = { _id: this.props.finalId, pairing };
		this.props.SaveFinalPairing(finalInfos);
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
				<div className="p-5">
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
							<div className="col-md-6 offset-3">
								<input
									type="submit"
									className="btn"
									name="jsonSubmit"
									id="jsonSubmit"
									value="Assigner des juges aux projets"
									onClick={this.OnImportData}
								/>
								<p>
									<small>
										Attention, ceci risque réinitialise tous les changements
										manuels effectués
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
	{
		SaveFinalPairing,
		ClearResponse,
		ClearErrors
	}
)(PairingFileImportation);
