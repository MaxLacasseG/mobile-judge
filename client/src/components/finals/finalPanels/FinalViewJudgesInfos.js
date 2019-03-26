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

	OnHandleClick = e => {
		//console.log(e.currentTarget.contentEditable);
		const target = e.currentTarget.parentNode.parentNode;
		const icon = target.querySelector(".edit-icon");
		const numberZone = target.querySelector(".number-zone");

		numberZone.isContentEditable === true
			? this.EditModeOff(target, icon, numberZone)
			: this.EditModeOn(target, icon, numberZone);
	};

	EditModeOn = (target, icon, numberZone) => {
		this.ResetAll();
		//Change icon
		icon.classList.remove("fa-edit");
		icon.classList.add("fa-save");
		//Add border
		target.classList.add("edit-mode");
		//Change edit mode
		numberZone.contentEditable = "true";
	};

	EditModeOff = (target, icon, numberZone) => {
		//Change icon
		icon.classList.remove("fa-save");
		icon.classList.add("fa-edit");
		//Remove border
		target.classList.remove("edit-mode");
		//Change edit mode
		numberZone.contentEditable = "false";

		if (!parseInt(target.innerText)) {
			numberZone.innerText = "";
		}
		this.props.SetJudgeNumber(
			numberZone.innerText,
			target.dataset.judgeid,
			this.props.final.selectedFinal._id
		);
	};

	ResetAll = () => {
		const elems = document.querySelectorAll(".edit-mode");
		for (let elem of elems) {
			const icon = elem.querySelector(".edit-icon");
			const numberZone = elem.querySelector(".number-zone");
			this.EditModeOff(elem, icon, numberZone);
		}
	};

	render() {
		const judges = this.props.judge.judgesList.sort(this.SortNullNumber());

		const infosList = judges.map(judge => {
			return (
				<div className="row judge-row pb-3" key={judge._id}>
					<div
						className="col-md-2 judge-col username judge-number"
						data-number={judge.number}
						data-judgeid={judge.judgeId}
					>
						<span>
							<i
								onClick={this.OnHandleClick}
								data-judgeid={judge.judgeId}
								className="p-2 mr-2 edit-icon fas fa-edit"
							/>
						</span>
						<div className="number-zone">{judge.number}</div>
					</div>
					<div className="col-md judge-col username">
						{judge.information.generalInformation.firstName}{" "}
						{judge.information.generalInformation.lastName}
					</div>
					<div className="col-md-2 judge-col username">
						{judge.information.generalInformation.phone.phoneMobile}
					</div>
					<div className="col-md judge-col username">{judge.username}</div>
					<div className="col-md-2 row judge-col">
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
					<div className="col-md-2 text-center">Numéro du juge</div>
					<div className="col-md text-center">Nom</div>
					<div className="col-md-2 text-center">Téléphone mobile</div>
					<div className="col-md text-center">Nom d'utilisateur</div>
					<div className="col-md-2 text-center">Mot de passe</div>
				</div>
				<div className="mb-3">{infosList}</div>
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
