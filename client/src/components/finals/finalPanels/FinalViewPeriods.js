import React, { Component, Fragment } from "react";
import FinalNav from "../../pages/partials/FinalNav";

export default class FinalViewPeriods extends Component {
	render() {
		console.log(this.props.match.params);
		const id = this.props.match.params[0];
		return (
			<Fragment>
				<FinalNav pageTitle="Finale - Infos" id={id} />
				<div className="container ">
					<div className="row py-5">
						<div className="col-md-6">test</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
