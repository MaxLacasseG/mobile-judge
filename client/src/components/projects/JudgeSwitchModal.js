import React, { Component, Fragment } from "react";
import classnames from "classnames";
export default class JudgeSwitchModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			judge: ""
		};
	}
	SavePairing = () => {
		if (this.state.judge === "") return;
		this.props.SavePairing(this.props.project, this.props.period, this.state.judge);
		this.props.ClearModal();
	};
	HandleSelect = e => {
		this.setState({ judge: e.currentTarget.value });
	};
	render() {
		const isInvalid = this.state.judge === "" ? true : false;
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
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="modalJudgeLabel">
									Modifier un juge
								</h5>
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
							<div className="modal-body" id="modalJudge-body">
								<h4 className="mx-auto">Projet {this.props.project}</h4>
								<h4 className="mx-auto">
									Période {String.fromCharCode(64 + parseInt(this.props.period))}
								</h4>
								<div className="form-group mx-auto">
									<label htmlFor="">Liste des juges disponibles</label>
									<select
										className="custom-select"
										name="judge"
										id="judge"
										onChange={this.HandleSelect}
										value={this.state.judge}
									>
										<option value="" />
										{opts}
									</select>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className={classnames("btn btn-primary", {
										disabled: isInvalid
									})}
									onClick={this.SavePairing}
								>
									Modifier le juge
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
