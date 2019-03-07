import React, { Component, Fragment } from "react";
import classnames from "classnames";
export default class JudgeSwitchModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			judge: ""
		};
	}

	componentDidMount = () => {
		console.log("mount", this.props);
	};

	GoToGrid = () => {
		const { project, judge, period, results } = this.props;
		this.props.GoToGrid(project, judge, period, results);
		this.props.ClearModal();
	};
	RemoveJudge = () => {
		const { project, judge, period } = this.props;

		this.props.RemoveJudge(project, period, judge);
		this.props.ClearModal();
	};

	SavePairing = () => {
		if (this.state.judge === "") return;
		const { project, period } = this.props;

		this.props.SavePairing(project, period, this.state.judge);
		this.props.ClearModal();
	};
	HandleSelect = e => {
		this.setState({ judge: e.currentTarget.value });
	};
	render() {
		const isInvalid = this.state.judge === "" ? true : false;
		const { judge } = this.props;

		const opts =
			this.props.list &&
			this.props.list.map(judge => {
				return (
					<option key={judge.number} value={judge.number}>
						{judge.number}
					</option>
				);
			});
		return (
			<Fragment>
				<button
					type="button"
					className="btn btn-primary d-none"
					data-toggle="modal"
					data-target="#modalJudge"
					id="modalJudge-btn"
				/>
				<div
					className="modal fade"
					id="modalJudge"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="modalJudgeLabel"
					aria-hidden="true"
					data-backdrop="static"
					data-keyboard="false"
				>
					<div className="modal-dialog modal-lg" role="document">
						<div className="modal-content ">
							<div className="modal-header">
								<h3 className="modal-title text-center" id="modalJudgeLabel">
									Projet {this.props.project} - Période{" "}
									{String.fromCharCode(64 + parseInt(this.props.period))}
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
							<div className="modal-body" id="modalJudge-body">
								<div className="mb-4 border-bottom">
									<h5 className="mx-auto">Saisir ou modifier un jugement</h5>
									<div className="my-2">
										{this.props.judge === undefined ? (
											<p>Aucun juge sélectionné</p>
										) : (
											<button
												type="button"
												className="btn btn-accent2 btn-block py-2"
												onClick={this.GoToGrid}
											>
												Voir la fiche
											</button>
										)}
									</div>
								</div>

								<div className="form-group mx-auto">
									<h5 className="mx-auto">
										Changer de juge
										<small className="pl-3">
											<span>
												<i className="fas fa-exclamation-circle" />
											</span>{" "}
											Attention, cela effacera un jugement enregistré
										</small>
									</h5>
									<label htmlFor="">Liste des juges disponibles</label>
									<select
										className="custom-select"
										name="judge"
										id="judge"
										onChange={this.HandleSelect}
										value={this.state.judge}
									>
										<option value="">
											{this.props.list.length === 0
												? "Aucun juge disponible pour cette période"
												: "Choisir un juge disponible"}
										</option>{" "}
										/>
										{opts}
									</select>
								</div>
							</div>
							<div className="modal-footer">
								{judge && (
									<button
										type="button"
										className="btn btn-danger mr-auto"
										onClick={this.RemoveJudge}
									>
										<span>
											<i className="fas fa-trash" />
										</span>{" "}
										Supprimer le juge pour cette période
									</button>
								)}
								{this.props.list.length > 0 && (
									<button
										type="button"
										className={classnames("btn btn-secondary", {
											"btn-disabled": isInvalid
										})}
										onClick={this.SavePairing}
									>
										{isInvalid
											? "Choisir un juge dans la liste"
											: "Modifier le juge"}
									</button>
								)}
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
