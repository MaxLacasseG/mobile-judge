import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { SelectFinalById } from "../../../store/actions/finalActions";
import { DeleteAllFinalJudges } from "../../../store/actions/judgeActions";
import { DeleteAllFinalProjects } from "../../../store/actions/projectActions";
import { DeleteFinal } from "../../../store/actions/finalActions";

import FinalNav from "../../pages/partials/FinalNav";
import PairingImportation from "../judgeProjectPairing/PairingFileImportation";
import FinalViewJudgesInfos from "./FinalViewJudgesInfos";
import isEmpty from "../../../validation/isEmpty";

class FinalViewInfos extends Component {
	componentDidMount = () => {
		this.props.SelectFinalById(this.props.match.params[0]);
	};

	DeleteFinal = () => {
		this.props.DeleteAllFinalJudges(this.props.final.selectedFinal._id);
		this.props.DeleteAllFinalProjects(this.props.final.selectedFinal._id);
		this.props.DeleteFinal(
			this.props.final.selectedFinal._id,
			this.props.history,
			this.props.auth.user.id,
			this.props.auth.user.isAdmin
		);
	};

	render() {
		const id = this.props.match.params[0];
		return (
			<Fragment>
				<div className="container ">
					<FinalNav pageTitle="Finale - Infos" id={id} />
					<div className="row">
						<div className="mx-auto">
							<PairingImportation finalId={this.props.match.params[0]} />
						</div>
					</div>

					{/* PASSWORD LIST */}
					<div className="mx-auto text-center">
						<h4>Liste des juges</h4>
					</div>
					<FinalViewJudgesInfos />

					{/* DELETE BUTTON */}
					<div className="row">
						<div className="alert alert-danger mx-auto text-center">
							<span>
								<i className="fas fa-exclamation-triangle" />
								&emsp;Attention, toutes les données seront effacées définitivement!
							</span>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4 offset-md-4">
							<div className="btn btn-block" onClick={this.DeleteFinal}>
								<span>
									<i className="fas fa-trash" />
								</span>
								&emsp; EFFACER LA FINALE
							</div>
						</div>
					</div>
					<hr />
				</div>
			</Fragment>
		);
	}
}
const mapStateToProps = state => ({
	auth: state.auth,
	final: state.final
});
export default connect(
	mapStateToProps,
	{ SelectFinalById, DeleteAllFinalJudges, DeleteAllFinalProjects, DeleteFinal }
)(FinalViewInfos);
