import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import FinalNav from "../../pages/partials/FinalNav";
import PairingImportation from "../judgeProjectPairing/PairingFileImportation";
import FinalViewJudgesInfos from "./FinalViewJudgesInfos";
import NewJudgeForm from "../../judges/NewJudgeForm";

import { SelectFinalById } from "../../../store/actions/finalActions";
import { DeleteAllFinalJudges, GetJudgesPwd } from "../../../store/actions/judgeActions";
import {
	DeleteAllFinalProjects,
	SelectProjectsByFinalId
} from "../../../store/actions/projectActions";
import { DeleteFinal } from "../../../store/actions/finalActions";
import isEmpty from "../../../validation/isEmpty";

class FinalViewInfos extends Component {
	componentDidMount = () => {
		this.props.SelectFinalById(this.props.match.params[0]);
		this.props.SelectProjectsByFinalId(this.props.match.params[0]);
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
	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.final !== this.props.final && isEmpty(prevProps.final.selectedFinal)) {
			this.props.GetJudgesPwd(this.props.final.selectedFinal._id);
		}
	};

	render() {
		const id = this.props.match.params[0];
		const final = this.props.final.selectedFinal;

		return (
			<Fragment>
				<FinalNav pageTitle="Finale - Infos" id={id} finalName={final.longName} />
				<div className="container ">
					<div className="row">
						<div className="mx-auto">
							<PairingImportation finalId={this.props.match.params[0]} />
						</div>
					</div>
					{/* NEW JUDGE FORM */}
					<NewJudgeForm />
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
				<footer className="text-center">
					L'application <strong>Jugement mobile</strong> a été développée par le{" "}
					<a href="http://technoscience.ca" target="_blank" rel="noopener noreferrer">
						<em>Réseau Technoscience</em>
					</a>
					, &copy; 2019.
				</footer>
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
	{
		SelectFinalById,
		SelectProjectsByFinalId,
		GetJudgesPwd,
		DeleteAllFinalJudges,
		DeleteAllFinalProjects,
		DeleteFinal
	}
)(FinalViewInfos);
