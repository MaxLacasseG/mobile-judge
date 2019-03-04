import React, { Component } from "react";
import { connect } from "react-redux";
import { LogoutJudge } from "../../store/actions/judgeActions";
class FinalEnded extends Component {
	OnLogout = () => {
		this.props.LogoutJudge();
	};
	render() {
		return (
			<div className="bg">
				<div className="container p-5 row">
					{/** LOGO FOR MOBILE */}
					<div className="col-12 col-md-6 text-left logo-container d-md-none">
						<img className="logo" src="/img/logo.png" alt="logo jugement mobile" />
					</div>
					<h1>Le jugement est maintenant terminé</h1>
					<p className="text-justify">
						Si vous n'avez pas eu le temps de terminer de saisir toutes les notes,
						veuillez communiquer avec la personne responsable ou le juge en chef de la
						finale.
					</p>
					<div className="btn btn-reseau btn-block text-center" onClick={this.OnLogout}>
						Quitter
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	{ LogoutJudge }
)(FinalEnded);
