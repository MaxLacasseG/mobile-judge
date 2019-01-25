import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Class showing an final item from the list
 * @props function  ToggleActivationFinal(id)   Activates the final
 * @props object    final               the final infos
 */
class FinalListItem extends Component {
	ToggleActivationFinal = e => {
		if (this.props.final !== null && this.props.final !== undefined) {
			this.props.ToggleActivationFinal(this.props.final._id);
		} else {
			console.log("Err ToggleActivationFinal():No final found");
		}
	};
	GoTo = address => {
		this.props.history.push(address);
	};
	RenderDate = date => {
		const renderedDate = new Date(Date.parse(date)).toLocaleDateString("fr-CA", {
			timeZone: "UTC"
		});
		return renderedDate;
	};
	render() {
		const { _id, longName, isActive, level, eventDate } = this.props.final;
		return (
			<div className="row border-bottom">
				<div className="col-9">
					<p className="p-0 m-0">
						{longName}-{" "}
						{isActive ? (
							<span className="text-info">Actif</span>
						) : (
							<span className="text-muted">Inactif</span>
						)}
					</p>
					<small>
						Volet{" "}
						{level === "elementary"
							? "primaire"
							: level === "highschool"
							? "secondaire"
							: null}{" "}
						- {this.RenderDate(eventDate)}
					</small>
				</div>
				<div className="col d-flex flew-row justify-content-around align-items-start">
					<button className="icon-button" onClick={this.ToggleActivationFinal}>
						{isActive ? (
							<i className="fas fa-2x fa-toggle-on text-info" />
						) : (
							<i className="fas fa-2x fa-toggle-off text-muted" />
						)}
					</button>

					<Link to={`/admin/finale/${_id}/vue-projets`} className="icon-button">
						<i className="fas fa-2x fa-sign-out-alt" />
					</Link>
				</div>
			</div>
		);
	}
}

FinalListItem.propTypes = {
	final: PropTypes.object.isRequired,
	ToggleActivationFinal: PropTypes.func.isRequired
};

export default withRouter(FinalListItem);
