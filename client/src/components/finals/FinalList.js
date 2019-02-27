import React, { Component } from "react";
import { connect } from "react-redux";
import FinalListItem from "./FinalListItem";
import {
	GetAllFinals,
	GetFinalsFromUser,
	ToggleFinalActivation
} from "../../store/actions/finalActions";

/**
 * Class that lists all the finals linked to a specific user
 */
class FinalsList extends Component {
	componentDidMount = () => {
		this.props.GetAllFinals(this.props.auth.user.id, this.props.auth.user.isAdmin);
	};

	ToggleFinalActivation = finalId => {
		this.props.ToggleFinalActivation(
			finalId,
			this.props.auth.user.isAdmin,
			this.props.auth.user.id
		);
	};

	render() {
		const finalListItems = this.props.final.finalList.map(final => {
			return (
				<FinalListItem
					key={final._id}
					final={final}
					ToggleFinalActivation={this.ToggleFinalActivation}
				/>
			);
		});
		return (
			<div className="p-5">
				<h4 className="section-header">
					<i className="fas fa-list-ul" />
					{"  "}
					Vos finales
				</h4>
				<div className="list-group list-group-flush">{finalListItems}</div>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	auth: state.auth,
	final: state.final
});

export default connect(
	mapStateToProps,
	{ GetAllFinals, GetFinalsFromUser, ToggleFinalActivation }
)(FinalsList);
