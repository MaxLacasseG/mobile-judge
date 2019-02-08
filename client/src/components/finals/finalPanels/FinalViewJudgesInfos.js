import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { GetJudgesPwd } from "../../../store/actions/judgeActions";

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

	render() {
		const judges = this.props.judge.judgesList;

		const infosList = judges.map(judge => {
			return (
				<div className="row judge-row p-3">
					<div className="col-md-4 judge-col username">{judge.number}</div>
					<div className="col-md-4 judge-col username">{judge.username}</div>
					<div className="col-md-4 row judge-col">
						<div class="mr-3 px-3">
							<span>
								<i onClick={this.ToggleBlur.bind(this)} className="fas fa-eye" />
							</span>
						</div>
						<div className=" judge-pwd pwd">{judge.pwd}</div>
					</div>
				</div>
			);
		});
		return <Fragment>{infosList}</Fragment>;
	}
}

const mapStateToProps = state => ({
	final: state.final,
	judge: state.judge
});

export default connect(
	mapStateToProps,
	{ GetJudgesPwd }
)(FinalViewJudgesInfos);
