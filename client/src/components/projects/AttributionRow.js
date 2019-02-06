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
		var col = "";

		if (isEmpty(this.props.attributionInfos)) {
			col = (
				<Fragment>
					<div className="col-md-1">1</div>
					<div className="col-md-1">2</div>
					<div className="col-md-1">3</div>
					<div className="col-md-1">4</div>
					<div className="col-md-1">5</div>
					<div className="col-md-1">6</div>
					<div className="col-md-1">7</div>
					<div className="col-md-1">8</div>
				</Fragment>
			);
		} else {
			col = Object.keys(this.props.attributionInfos).map((period, index) => {
				console.log(this.props.attributionInfos[period]);
				return (
					<div key={index} className="col-md-1 border border-red">
						{isEmpty(this.props.attributionInfos[period].judge)
							? ""
							: this.props.attributionInfos[period].judge}
					</div>
				);
			});
		}
		return <Fragment>{col}</Fragment>;
	}
}

export default AttributionRow;
