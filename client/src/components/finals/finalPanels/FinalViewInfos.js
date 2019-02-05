import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { SelectFinalById } from "../../../store/actions/finalActions";

import FinalNav from "../../pages/partials/FinalNav";
import PairingImportation from "../judgeProjectPairing/PairingFileImportation";

import isEmpty from "../../../validation/isEmpty";

class FinalViewInfos extends Component {
	componentDidMount = () => {
		this.props.SelectFinalById(this.props.match.params[0]);
	};

	render() {
		const id = this.props.match.params[0];
		const selectedFinal = this.props.final.selectedFinal;

		const emptyAlert = isEmpty(selectedFinal.pairing) ? (
			<p className="alert alert-danger col-md-6 offset-3">
				<i className="fas fa-exclammation-triangle" />
				Aucun pairage n'est enregistré pour cette finale
			</p>
		) : null;

		return (
			<Fragment>
				<FinalNav pageTitle="Finale - Infos" id={id} />
				<div className="container ">
					<div className="row py-5">
						{emptyAlert}
						<PairingImportation finalId={this.props.match.params[0]} />
					</div>
				</div>
			</Fragment>
		);
	}
}
const mapStateToProps = state => ({
	final: state.final
});
export default connect(
	mapStateToProps,
	{ SelectFinalById }
)(FinalViewInfos);
