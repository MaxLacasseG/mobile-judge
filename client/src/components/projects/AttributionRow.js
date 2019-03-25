import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import isEmpty from "../../validation/isEmpty";
import classnames from "classnames";
import JudgeSwitchModal from "./JudgeSwitchModal";
import { UpdateFinal } from "../../store/actions/finalActions";
/**
 * @props attributionByProject  Object  Contains the pairing infos for a project
 * @props minJudges         Int     The minimal number of judges per project
 * @props number            Int     The project number
 */

class AttributionRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cols: [],
			modal: "",
			pairing: ""
		};
	}
	// ===============================================
	// #region LIFE CYCLE METHODS
	// =============
	componentDidMount = () => {
		window.setTimeout(() => {
			this.ManageCols();
		}, 300);
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.final.selectedFinal !== this.props.final.selectedFinal) {
			this.ManageCols();
		}
	};

	// #endregion

	// ===============================================
	// #region COLUMNS FORMATTING
	// =============

	/**
	 * Generates a column with the correct data or "-" if empty
	 */
	ManageCols = () => {
		const projectNumber = this.props.projectNumber;
		const cols = [];

		//FOR each period, fill the col with data
		for (let period = 1; period <= 8; period++) {
			const judgeNumber = this.GetPairingInfos(projectNumber, period);
			cols.push(this.FillCol(projectNumber, period, judgeNumber));
		}
		this.CheckJudgeAmount();
		//SAVE cols into state
		this.setState({ cols });
	};

	/**
	 * Checks for existing pairing
	 * @param	{number} project
	 * @param	{number} period
	 * @returns {number|undefined|null} 	judge returns the judge number, an empty string if no judge is assigned,null if no pairing is found
	 */
	GetPairingInfos = (project, period) => {
		const pairingInfos = this.props.final.selectedFinal.pairing.pairingByProjects;
		// Nothing is assigned to the project
		if (isEmpty(pairingInfos)) return null;
		// No judge is assigned
		if (isEmpty(pairingInfos[project][period])) return undefined;

		return pairingInfos[project][period].judge;
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

	/**
	 * Fill the col with the correct jsx tags and listeners
	 * @param {number} 		projectNumber
	 * @param {number} 		period
	 * @param {number} 		judgeNumber
	 * @return {object}		JSX
	 */
	FillCol = (projectNumber, period, judgeNumber) => {
		const isComplete = this.CheckJudgmentStatus(projectNumber, judgeNumber);
		return (
			<div
				key={period}
				className={classnames("col-md grid-cell", {
					"grid-cell-complete": isComplete
				})}
				data-project={projectNumber}
				data-judge={isEmpty(judgeNumber) ? undefined : judgeNumber}
				data-period={period}
				onClick={this.HandleClick}
			>
				{isEmpty(judgeNumber) ? (
					" - "
				) : (
					<div>
						Juge {judgeNumber}{" "}
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
	// #endregion

	// ================================================
	// #region JUDGE MANAGEMENT
	// =================
	CheckJudgeAmount = () => {
		//if (isEmpty(this.props.attributionByProject)) return console.log("Aucun pairage");
		let judgeNumber = 0;

		Object.keys(this.props.attributionByProject).map((period, index) => {
			if (!isEmpty(this.props.attributionByProject[period].judge)) judgeNumber++;

			return null;
		});

		judgeNumber != this.props.minJudges
			? this.props.ShowMissingJudge(this.props.projectNumber, true)
			: this.props.ShowMissingJudge(this.props.projectNumber, false);
	};

	SavePairing = (project, period, judge) => {
		if (judge === undefined) return;
		const final = this.props.final && this.props.final.selectedFinal;
		const pairing = this.props.final && this.props.final.selectedFinal.pairing;
		const results = this.props.final && this.props.final.selectedFinal.results;

		// Cast to int, got converted to string somewhere
		project = parseInt(project);
		period = parseInt(period);
		judge = parseInt(judge);
		let oldJudge;

		// CHANGE PAIRINGBYPROJECTS
		if (isEmpty(pairing.pairingByProjects[project])) {
			pairing.pairingByProjects[project] = {};
		}
		if (isEmpty(pairing.pairingByProjects[project][period])) {
			pairing.pairingByProjects[project][period] = { project, period, judge: null };
		}
		//saves old judge infos
		oldJudge = pairing.pairingByProjects[project][period].judge;

		//Saves change new judge infos
		pairing.pairingByProjects[project][period] = {
			project: project,
			period: period,
			judge: judge
		};

		// CHANGE PAIRINGBYJUDGES
		if (isEmpty(pairing.pairingByJudges[judge])) {
			pairing.pairingByJudges[judge] = {};
		}

		if (isEmpty(pairing.pairingByJudges[judge][period])) {
			pairing.pairingByJudges[judge][period] = { project: null, period, judge };
		}

		pairing.pairingByJudges[judge][period] = {
			project: project,
			period: period,
			judge: judge
		};

		//console.log("JUDGE SWITCH", oldJudge, judge);
		// RESET OLD JUDGE
		if (oldJudge && !isEmpty(pairing.pairingByJudges[oldJudge][period])) {
			delete pairing.pairingByJudges[oldJudge][period];
		}

		// CHANGE RESULTS
		if (results[project] !== undefined && results[project][oldJudge] !== undefined) {
			delete results[project][oldJudge];
			if (isEmpty(results[project])) {
				delete results[project];
			}
		}

		// CHANGE RESULTS
		if (results[project] && results[project][judge] !== undefined) {
			delete results[project][judge];
			if (isEmpty(results[project])) {
				delete results[project];
			}
		}

		//console.log(results);
		//Save new info
		final.pairing = pairing;
		final.results = results;

		this.props.UpdateFinal(final);
		this.ManageCols();
	};

	ShowJudgeModal = (project, judge, period, results) => {
		let list = this.props.judge.judgesList;
		list = this.CheckAvailibility(list, period);

		const modal = (
			<JudgeSwitchModal
				project={project}
				period={period}
				judge={judge}
				results={results}
				list={list}
				ClearModal={this.ClearModal}
				SavePairing={this.SavePairing}
				GoToGrid={this.GoToGrid}
				RemoveJudge={this.RemoveJudge}
			/>
		);
		this.setState({ modal }, () => {
			document.getElementById("modalJudge-btn").click();
		});
	};

	/**
	 * Returns the list of available judges for specific project and
	 */
	CheckAvailibility = (list, period) => {
		let filteredList = this.CheckJudgeOtherPeriods(list);
		filteredList = this.CheckIfIsJudgingAtPeriod(filteredList, period);
		return filteredList;
	};

	/**
	 * Removes judges that already paired with the project during another period
	 * @param {object[]} list the from props.judge.judgesList
	 * @return {object[]} the filtered list
	 */
	CheckJudgeOtherPeriods = list => {
		let newList = list.filter(judge => {
			if (judge.number === null) return false;

			// for each period check availability
			for (let period in this.props.attributionByProject) {
				if (this.props.attributionByProject[period].judge === judge.number) return false;
			}

			return true;
		});
		return newList;
	};

	/**
	 * Removes judges that are evaluating another project during given period
	 */
	CheckIfIsJudgingAtPeriod = (list, period) => {
		const pairing = this.props.final.selectedFinal.pairing.pairingByProjects;

		let newList = list.filter(judge => {
			if (judge.number === null) return false;

			//Remove judge from list, if exist in pairing for same period,
			for (let project in pairing) {
				if (pairing[project][period] && pairing[project][period].judge === judge.number)
					return false;
			}

			return true;
		});
		return newList;
	};

	RemoveJudge = (project, period, judge) => {
		if (judge === undefined) return;
		const final = this.props.final && this.props.final.selectedFinal;
		const pairing = this.props.final && this.props.final.selectedFinal.pairing;
		const results = this.props.final && this.props.final.selectedFinal.results;

		//console.log("results", results);
		// Cast to int, got converted to string somewhere
		project = parseInt(project);
		period = parseInt(period);
		judge = parseInt(judge);

		//Check if pairingByProjects is not empty
		//Empty pairingByProjects for the specific period
		if (
			pairing.pairingByProjects[project] &&
			!isEmpty(pairing.pairingByProjects[project][period])
		) {
			pairing.pairingByProjects[project][period] = { project, period, judge: null };
		}

		//Check if pairingByProjects is not empty
		//Empty pairingByProjects for the specific period
		if (pairing.pairingByJudges[judge] && !isEmpty(pairing.pairingByJudges[judge][period])) {
			pairing.pairingByJudges[judge][period] = { project: null, period, judge };
		}

		//Check if results is not empty
		//Empty results for the specific period
		if (results && results[project]) {
			delete results[project][judge];
		}

		//console.log("remove end", final, pairing, results);

		final.pairing = pairing;
		final.results = results;

		this.props.UpdateFinal(final);
		//this.ManageCols();
	};

	HandleClick = e => {
		const { project, judge, period } = e.currentTarget.dataset;
		console.log("click", project, judge, period);

		const results = this.props.final.selectedFinal.results;

		this.ShowJudgeModal(project, judge, period, results);
	};

	ClearModal = () => {
		document.getElementById("closeModalBtn").click();
		this.setState({ modal: "" });
	};
	// #endregion

	// ================================================
	// #region EVALUATION GRID LINK MANAGEMENT
	// =================
	GoToGrid = (project, judge, period, results) => {
		this.props.history.push({
			pathname: `/admin/finale/${this.props.match.params[0]}/grid/${project}`,
			state: {
				period: period,
				project: project,
				judge: judge,
				finalId: this.props.match.params[0],
				isAdmin: true,
				results: this.CheckExistingResult(project, judge, results)
					? this.ImportResults(project, judge, results)
					: {}
			}
		});
	};

	CheckExistingResult = (projectNumber, judgeNumber, results) => {
		if (isEmpty(results)) return false;
		if (isEmpty(results[projectNumber])) return false;
		if (isEmpty(results[projectNumber][judgeNumber])) return false;

		if (results[projectNumber][judgeNumber].hasOwnProperty("results")) {
			return true;
		}

		return false;
	};

	ImportResults = (projectNumber, judgeNumber, results) => {
		return results[projectNumber][judgeNumber];
	};
	//#endregion

	render() {
		return (
			<Fragment>
				{this.state.modal}
				{this.state.cols}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	judge: state.judge,
	final: state.final
});

export default connect(
	mapStateToProps,
	{ UpdateFinal }
)(AttributionRow);
