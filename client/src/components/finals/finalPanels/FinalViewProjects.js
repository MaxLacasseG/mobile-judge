import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { SelectFinalById } from "../../../store/actions/finalActions";

import FinalNav from "../../pages/partials/FinalNav";

class FinalViewProjects extends Component {
	componentDidMount = () => {
		this.props.SelectFinalById(this.props.match.params[0]);
	};

	render() {
		const id = this.props.match.params[0];
		const final = this.props.final.selectedFinal;
		return (
			<Fragment>
				<FinalNav pageTitle="Finale - Vue par projets" id={id} finalName={final.longName} />
				<div className="container ">
					<div className="row py-5">
						<div className="col-md-6">{final.longName}</div>
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
)(FinalViewProjects);
