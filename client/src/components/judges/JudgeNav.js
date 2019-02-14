import React, { Component } from "react";
import { connect } from "react-redux";
import { LogoutJudge } from "../../store/actions/judgeActions";
class JudgeNav extends Component {
	render() {
		return (
			<div class="row">
				<div class="col-4">
					<div className="btn btn-reseau mb-4" onClick={this.props.LogoutJudge}>
						<span>
							<i className="fas fa-lock" />
						</span>{" "}
						Déconnecter
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	{ LogoutJudge }
)(JudgeNav);
