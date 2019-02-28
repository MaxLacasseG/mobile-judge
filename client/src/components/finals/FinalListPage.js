import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AdminNav from "../pages/partials/AdminNav";
import FinalList from "./FinalList";
import FinalJSONImport from "./finalImportation/FinalJSONImport";
import InitPwdForm from "../admin/auth/InitPwd";
import { ClearJudgesList } from "../../store/actions/judgeActions";
import { ClearProjectsList } from "../../store/actions/projectActions";
import { ClearSelectedFinal } from "../../store/actions/finalActions";
class AdminListPage extends Component {
	componentDidMount = () => {
		this.props.ClearJudgesList();
		this.props.ClearProjectsList();
		this.props.ClearSelectedFinal();
	};

	render() {
		const admin = this.props.auth.user;
		return (
			<Fragment>
				{admin.newAdmin ? (
					<InitPwdForm />
				) : (
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
				)}
			</Fragment>
		);
	}
}
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(
	mapStateToProps,
	{ ClearJudgesList, ClearProjectsList, ClearSelectedFinal }
)(AdminListPage);
