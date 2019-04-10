import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { SelectFinalById } from "../../../store/actions/finalActions";
import { SelectProjectsByFinalId } from "../../../store/actions/projectActions";
import { SelectJudgesByFinalId } from "../../../store/actions/judgeActions";

import FinalNav from "../../pages/partials/FinalNav";
import ReportsJudgingImportation from "../../judges/writtenReports/ReportsJudgingImportation";
import ReportsResults from "../../judges/writtenReports/ReportsResults";

class FinalViewReports extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
	}
	componentDidMount = () => {
		this.props.SelectFinalById(this.props.match.params[0]);
		this.props.SelectProjectsByFinalId(this.props.match.params[0]);
		this.props.SelectJudgesByFinalId(this.props.match.params[0]);
	};

	HandleClick = e => {
		this.setState({ showModal: true });
	};
	HideModal = () => {
		this.setState({ showModal: false });
	};
	render() {
		const id = this.props.match.params[0];
		const final = this.props.final.selectedFinal;

		return (
			<Fragment>
				<FinalNav pageTitle="Finale - Vue par périodes" id={id} />
				<div className="container ">
					<div className="row">
						<div className="mx-auto">
							{(final.reportsResults === undefined ||
								this.state.showModal === true) && (
								<ReportsJudgingImportation
									finalId={this.props.match.params[0]}
									HideModal={this.HideModal}
								/>
							)}
						</div>
					</div>

					{final.reportsResults && (
						<div className="row">
							<div className="btn mx-auto my-5" onClick={this.HandleClick}>
								Réimporter les résultats
							</div>
							<ReportsResults />
						</div>
					)}
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	final: state.final,
	project: state.project
});

export default connect(
	mapStateToProps,
	{ SelectFinalById, SelectProjectsByFinalId, SelectJudgesByFinalId }
)(FinalViewReports);
