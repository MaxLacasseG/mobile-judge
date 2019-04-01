import React, { Component, Fragment } from "react";
import classnames from "classnames";
import isEmpty from "../../validation/isEmpty";

export default class TypeSwitchModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: ""
		};
	}

	componentDidMount = () => {
		//console.log("mount", this.props);
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

	SaveNewType = () => {
		if (this.state.type === "") return;

		if (this.props.results[this.props.projectnumber]) {
			this.MakeTXTFile(
				this.props.projectnumber,
				this.props.results[this.props.projectnumber],
				this.props.type
			);
		}
		this.props.SwitchProjectType(this.props.projectid, this.state.type);
		this.props.ClearModal();
	};

	MakeTXTFile = (projectNumber, results, oldType) => {
		if (isEmpty(results)) return;

		//CREATE FILE
		//For each results of a project
		let txt = "";
		let titre = `======== CHANGEMENT TYPE ========\n`;
		titre += `Projet ${projectNumber}\n`;
		titre += `Type ${oldType}\n`;
		titre += `================================\n\n`;

		let judgeTxt = "";
		for (const judge in results) {
			if (results.hasOwnProperty(judge)) {
				judgeTxt += `Juge : ${judge} | Période : ${results[judge].period}\n`;

				for (const result in results[judge].results) {
					if (results[judge].results.hasOwnProperty(result)) {
						//Print each result
						judgeTxt += `${result} : ${results[judge].results[result].grade}/10 |  ${
							results[judge].results[result].total
						}/100 \n`;
					}
				}
				judgeTxt += "------------------------\n";
				judgeTxt += `Total:${results[judge].total}/100\n`;
				judgeTxt += "------------------------\n";
				judgeTxt += `Résultat complet:${results[judge].isComplete ? "Oui" : "Non"}\n\n`;
			}
		}
		txt = titre + judgeTxt;

		//FORMAT FILE
		let txtToDownload = document.createElement("a");
		txtToDownload.style.display = "none";
		txtToDownload.href = "data:text/plain;charset=utf-8," + encodeURI(txt);
		txtToDownload.target = "_blank";
		txtToDownload.download = `ChangementType_Projet_${projectNumber}_${oldType}.txt`;

		//DOWNLOAD FILE
		document.getElementById("linkContainer").appendChild(txtToDownload);
		txtToDownload.click();
	};

	ResetResults = () => {};

	HandleSelect = e => {
		this.setState({ type: e.currentTarget.value });
	};

	render() {
		const isInvalid = this.state.type === "" ? true : false;
		const selectedType = this.props.type;
		const types = ["vulgarization", "conception", "experimentation"];

		const opts = types
			.filter(type => {
				return type !== selectedType;
			})
			.map(type => {
				return (
					<option key={type} value={type}>
						{this.FormatType(type)}
					</option>
				);
			});
		return (
			<Fragment>
				<div id="linkContainer" />
				<button
					type="button"
					className="btn btn-primary d-none"
					data-toggle="modal"
					data-target="#modalTypeSwitch"
					id="modalTypeSwitch-btn"
				/>
				<div
					className="modal fade"
					id="modalTypeSwitch"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="modalTypeSwitchLabel"
					aria-hidden="true"
					data-backdrop="static"
					data-keyboard="false"
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content ">
							<div className="modal-header">
								<h3 className="modal-title text-center" id="modalTypeSwitchLabel">
									Projet {this.props.projectnumber}
								</h3>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
									id="closeModalBtn"
									onClick={this.props.ClearModal}
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<hr />
							<div className="modal-body" id="modalTypeSwitch-body">
								<div className="mb-1 border-bottom">
									<h5 className="mx-auto">Modifier le type</h5>
								</div>

								<div className="form-group mx-auto">
									<h6 className="mx-auto">
										<span>
											<i className="fas fa-exclamation-circle" />
										</span>{" "}
										Attention, cela réinitialisera tous les jugements du projet
									</h6>
									<select
										className="custom-select"
										name="judge"
										id="judge"
										onChange={this.HandleSelect}
										value={this.state.type}
									>
										<option value="" />
										{opts}
									</select>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className={classnames("btn btn-secondary", {
										"btn-disabled": isInvalid
									})}
									onClick={!isInvalid ? this.SaveNewType : null}
								>
									Enregistrer le changement
								</button>

								<button
									type="button"
									className="btn btn-secondary"
									data-dismiss="modal"
									onClick={this.props.ClearModal}
								>
									Annuler
								</button>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
