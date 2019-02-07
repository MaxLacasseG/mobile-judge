import React, { Component, Fragment } from "react";
import isEmpty from "../../validation/isEmpty";
/**
 * @props attributionInfos  Object  Contains the pairing infos for a project
 * @props minJudges         Int     The minimal number of judges per project
 * @props number            Int     The project number
 */

class AttributionRow extends Component {
	componentDidMount = () => {
		//console.log(this.props.attributionInfos, this.props.minJudges, this.props.number);
	};

	render() {
		let cols = [];
		if (isEmpty(this.props.attributionInfos)) {
			for (let i = 0; i < 8; i++) {
				cols.push(
					<div className="col-md grid-cell" key={i}>
						{" - "}
					</div>
				);
			}
		} else {
			cols = Object.keys(this.props.attributionInfos).map((period, index) => {
				console.log(this.props.attributionInfos[period]);
				return (
					<div key={index} className="col-md grid-cell">
						{isEmpty(this.props.attributionInfos[period].judge)
							? " - "
							: this.props.attributionInfos[period].judge}
					</div>
				);
			});
		}
		return <Fragment>{cols}</Fragment>;
	}
}

export default AttributionRow;
