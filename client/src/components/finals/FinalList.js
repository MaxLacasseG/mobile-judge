import React, { Component } from "react";
import { connect } from "react-redux";
import FinalListItem from "./FinalListItem";
import { GetAllFinals, GetFinalsFromUser } from "../../store/actions/finalActions";

/**
 * Class that lists all the finals linked to a specific user
 */
class FinalsList extends Component {
	componentDidMount = () => {
		this.props.auth.user.isAdmin
			? this.props.GetAllFinals()
			: this.props.GetFinalsFromUser(this.props.auth.user.id);
	};

	ToggleActivationFinal = id => {
		console.log(id);
	};

	render() {
		const finalListItems = this.props.final.finalList.map(final => {
			return (
				<FinalListItem
					key={final._id}
					final={final}
					ToggleActivationFinal={this.ToggleActivationFinal}
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
	{ GetAllFinals, GetFinalsFromUser }
)(FinalsList);
