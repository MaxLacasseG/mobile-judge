import React, { Component, Fragment } from "react";
import isEmpty from "../../validation/isEmpty";
/**
 * @props attributionInfos  Object  Contains the pairing infos for a project
 * @props minJudges         Int     The minimal number of judges per project
 * @props number            Int     The project number
 */

class AttributionRow extends Component {
	componentDidMount = () => {
		if (!this.CheckJudgeAmount()) this.props.ShowMissingJudge(this.props.number);
	};

	CheckJudgeAmount = () => {
		if (isEmpty(this.props.attributionInfos)) return console.log("Aucun pairage");
		let judgeNumber = 0;

		Object.keys(this.props.attributionInfos).map((period, index) => {
			if (!isEmpty(this.props.attributionInfos[period].judge)) judgeNumber++;

			return null;
		});

		return judgeNumber < this.props.minJudges ? false : true;
	};

	ChangeAttribution = e => {
		console.log(e.target.dataset.project, e.target.dataset.judge, e.target.dataset.period);
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
				//console.log(this.props.attributionInfos[period]);
				return (
					<div
						key={index}
						className="col-md grid-cell"
						data-project={this.props.number}
						data-judge={this.props.attributionInfos[period].judge}
						data-period={period}
						onClick={this.ChangeAttribution}
					>
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
