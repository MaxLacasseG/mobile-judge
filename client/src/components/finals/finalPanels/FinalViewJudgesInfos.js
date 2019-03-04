import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { GetJudgesPwd, SetJudgeNumber } from "../../../store/actions/judgeActions";

class FinalViewJudgesInfos extends Component {
	componentDidMount = () => {
		//console.log(this.props);
		this.props.GetJudgesPwd(this.props.final.selectedFinal._id);
	};

	componentWillUnmount = () => {};

	ToggleBlur = e => {
		const nextField = e.target.parentNode.parentNode.nextSibling;
		const blurState = nextField.classList.contains("pwd");
		document.querySelectorAll("div.judge-pwd").forEach(elem => {
			elem.classList.add("pwd");
		});

		blurState ? nextField.classList.remove("pwd") : nextField.classList.add("pwd");
	};

	SortNullNumber = () => {
		return (a, b) => {
			if (a.number === null) {
				return 1;
			} else if (b.number === null) {
				return -1;
			}
		};
	};

	OnHandleDblClick = e => {
		//console.log(e.currentTarget.contentEditable);
		const target = e.currentTarget;
		target.isContentEditable === true ? this.EditModeOff(target) : this.EditModeOn(target);
	};

	EditModeOn = target => {
		this.ResetAll();
		target.classList.add("edit-mode");
		target.contentEditable = "true";
	};

	EditModeOff = target => {
		//console.log("off", target);
		target.classList.remove("edit-mode");
		target.contentEditable = "false";
		//console.log(target.innerText, target.dataset.judgeid, this.props.final.selectedFinal._id);
		this.props.SetJudgeNumber(
			target.innerText,
			target.dataset.judgeid,
			this.props.final.selectedFinal._id
		);
	};

	ResetAll = () => {
		const elems = document.querySelectorAll(".edit-mode");
		for (let elem of elems) {
			this.EditModeOff(elem);
		}
	};

	render() {
		const judges = this.props.judge.judgesList.sort(this.SortNullNumber());

		const infosList = judges.map(judge => {
			return (
				<div className="row judge-row px-3 mb-3" key={judge._id}>
					<div
						className="col-md-4 judge-col username"
						onDoubleClick={this.OnHandleDblClick}
						data-number={judge.number}
						data-judgeid={judge.judgeId}
					>
						{judge.number}
					</div>
					<div className="col-md-4 judge-col username">{judge.username}</div>
					<div className="col-md-4 row judge-col">
						<div className="mr-3 px-3">
							<span>
								<i onClick={this.ToggleBlur.bind(this)} className="fas fa-eye" />
							</span>
						</div>
						<div className=" judge-pwd pwd">{judge.pwd}</div>
					</div>
				</div>
			);
		});
		return (
			<Fragment>
				<div className="row judge-row px-3 mb-3">
					<div className="col-md-4 text-center">Numéro du juge</div>
					<div className="col-md-4 text-center">Nom d'utilisateur</div>
					<div className="col-md-4 text-center">Mot de passe</div>
				</div>
				{infosList}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	final: state.final,
	judge: state.judge
});

export default connect(
	mapStateToProps,
	{ GetJudgesPwd, SetJudgeNumber }
)(FinalViewJudgesInfos);
