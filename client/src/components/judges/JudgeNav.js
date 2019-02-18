import React, { Component } from "react";
import { connect } from "react-redux";
import { LogoutJudge } from "../../store/actions/judgeActions";
class JudgeNav extends Component {
	render() {
		return (
			<div class="row no-gutter">
				<div class="col-4 offset-7">
					<div className="btn btn-reseau mb-4" onClick={this.props.LogoutJudge}>
						<span>
							<i className="fas fa-lock" />
						</span>{" "}
						Déconnecter
					</div>
				</div>
				{/** LOGO FOR MOBILE */}
				<div className="col-12 col-md-6 text-left logo-container d-md-none">
					<img className="logo" src="/img/logo.png" alt="logo jugement mobile" />
				</div>

				{/** LOGO FOR TABLET & UP */}
				<div className="col-6 col-md-6 text-left d-none">
					<img className="logo" src="/img/logo_exs.png" alt="logo Expo-sciences" />
				</div>
				<div className="col-12 col-md-6 text-left d-none">
					<img className="logo" src="/img/logo.png" alt="logo jugement mobile" />
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	{ LogoutJudge }
)(JudgeNav);
