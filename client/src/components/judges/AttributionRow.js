import React, { Component, Fragment } from "react";
import isEmpty from "../../validation/isEmpty";
import classnames from "classnames";
/**
 * @props attributionInfos  Object  Contains the pairing infos for a project
 * @props minJudges         Int     The minimal number of judges per project
 * @props number            Int     The project number
 */

class AttributionRow extends Component {
	componentDidMount = () => {
		//if (!this.CheckJudgeAmount()) this.props.ShowMissingJudge(this.props.number);
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

		//If no information is given show "-",
		//else show project for each period
		if (isEmpty(this.props.attributionInfos) || Object.keys(this.props.attributionInfos) < 8) {
			for (let i = 0; i < 8; i++) {
				cols.push(
					<div className="col-md grid-cell" key={i}>
						{" - "}
					</div>
				);
			}
		} else {
			for (let i = 1; i <= 8; i++) {
				if (isEmpty(this.props.attributionInfos[i])) {
					cols.push(
						<div className="col-md grid-cell" key={i}>
							{" - "}
						</div>
					);
				} else {
					const period = i;
					const project = this.props.attributionInfos[period].project;
					const judge = this.props.attributionInfos[period].judge;
					let isComplete = false;

					//Checks if judgement is completed
					if (this.props.results !== undefined && !isEmpty(this.props.results[project])) {
						if (!isEmpty(this.props.results[project][judge])) {
							isComplete = this.props.results[project][judge].isComplete;
						}
					}

					//Creates each individual grid cell
					cols.push(
						<div
							key={i}
							className={classnames("col-md grid-cell", {
								"grid-cell-complete": isComplete
							})}
							data-judge={judge}
							data-project={project}
							data-period={period}
							onClick={this.ChangeAttribution}
						>
							{isEmpty(project) ? (
								" - "
							) : (
								<div>
									Projet {project}{" "}
									{isComplete && (
										<span>
											<i className="fas fa-check" />
										</span>
									)}
								</div>
							)}
						</div>
					);
				}
			}
		}
		return <Fragment>{cols}</Fragment>;
	}
}

export default AttributionRow;
