import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import isEmpty from "../../validation/isEmpty";
import classnames from "classnames";
/**
 * @props attributionInfos  Object  Contains the pairing infos for a project
 * @props minJudges         Int     The minimal number of judges per project
 * @props number            Int     The project number
 */

class AttributionRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cols: [],
			pairing: ""
		};
	}
	componentDidMount = () => {
		//if (!this.CheckJudgeAmount()) this.props.ShowMissingJudge(this.props.number);
		window.setTimeout(() => {
			this.ManageCols();
		}, 300);
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.final.selectedFinal !== this.props.final.selectedFinal) {
			console.log("UPDATE CHANGE IN FINAL INFOS");

			//this.ManageCols();
		}
	};

	ManageCols = () => {
		const judgeNumber = this.props.judgeNumber;
		const cols = [];

		//FOR each period, fill the col with data
		for (let period = 1; period <= 8; period++) {
			const projectNumber = this.GetPairingInfos(judgeNumber, period);
			cols.push(this.FillCol(projectNumber, period, judgeNumber));
		}

		//SAVE cols into state
		this.setState({ cols });
	};

	/**
	 * Checks for existing pairing
	 * @param	{number} judgeNumber
	 * @param	{number} period
	 * @returns {number|undefined|null} 	judge returns the project number, an empty string if no project is assigned,null if no pairing is found
	 */
	GetPairingInfos = (judgeNumber, period) => {
		const pairingInfos = this.props.final.selectedFinal.pairing.pairingByJudges;
		// Nothing is assigned to the project
		if (isEmpty(pairingInfos) || isEmpty(pairingInfos[judgeNumber])) return null;
		// No judge is assigned
		if (isEmpty(pairingInfos[judgeNumber][period])) return undefined;

		return pairingInfos[judgeNumber][period].project;
	};

	FillCol = (projectNumber, period, judgeNumber) => {
		const isComplete = this.CheckJudgmentStatus(projectNumber, judgeNumber);
		return (
			<div
				key={projectNumber + "" + period}
				className={classnames("col-md grid-cell", {
					"grid-cell-complete": isComplete
				})}
				data-judge={judgeNumber}
				data-project={projectNumber}
				data-period={period}
			>
				{isEmpty(projectNumber) ? (
					" - "
				) : (
					<div>
						Projet {projectNumber}{" "}
						{isComplete && (
							<span>
								<i className="fas fa-check" />
							</span>
						)}
					</div>
				)}
			</div>
		);
	};

	/**
	 * Check is judgement is completed for specific project and judge
	 * @param {number} projectNumber
	 * @param {number} judgeNumber
	 * @return {true|false} Returns true if judgement is complete.Else returns false.
	 */
	CheckJudgmentStatus = (projectNumber, judgeNumber) => {
		const results = this.props.final.selectedFinal.results;
		if (
			results === undefined ||
			isEmpty(results[projectNumber]) ||
			isEmpty(results[projectNumber][judgeNumber])
		)
			return false;
		return results[projectNumber][judgeNumber].isComplete;
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

	render() {
		return <Fragment>{this.state.cols}</Fragment>;
	}
}

const mapStateToProps = state => ({
	judge: state.judge,
	final: state.final
});

export default connect(mapStateToProps)(AttributionRow);
