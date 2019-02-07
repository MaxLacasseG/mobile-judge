import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AdminNav from "../pages/partials/AdminNav";
import FinalList from "./FinalList";
import FinalJSONImport from "./finalImportation/FinalJSONImport";
import { ClearJudgesList } from "../../store/actions/judgeActions";
import { ClearProjectsList } from "../../store/actions/projectActions";
class AdminListPage extends Component {
	componentDidMount = () => {
		this.props.ClearJudgesList();
		this.props.ClearProjectsList();
	};

	render() {
		return (
			<Fragment>
				<AdminNav pageTitle="Vue de l'ensemble des finales" />
				<div className="container ">
					<div className="row py-5">
						<div className="col-md-6 spliter">
							<FinalJSONImport />
						</div>
						<div className="col-md-6">
							<FinalList />
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default connect(
	null,
	{ ClearJudgesList, ClearProjectsList }
)(AdminListPage);
