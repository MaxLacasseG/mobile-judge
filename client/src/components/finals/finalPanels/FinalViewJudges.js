import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { SelectFinalById } from "../../../store/actions/finalActions";

import FinalNav from "../../pages/partials/FinalNav";

class FinalViewJudges extends Component {
	componentDidMount = () => {
		this.props.SelectFinalById(this.props.match.params[0]);
	};

	render() {
		const id = this.props.match.params[0];
		return (
			<Fragment>
				<FinalNav pageTitle="Finale - Vue par juges" id={id} />
				<div className="container ">
					<div className="row py-5">
						<div className="col-md-6">test</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default connect(
	null,
	{ SelectFinalById }
)(FinalViewJudges);
