import React, { Component, Fragment } from "react";
import isEmpty from "../../../validation/isEmpty";

export default class EvaluationButtonGroup extends Component {
	componentDidMount = () => {
		if (!isEmpty(this.props.results)) {
			if (!isEmpty(this.props.results[this.props.id])) {
				const grade = this.props.results[this.props.id].grade;
				const input = document.querySelector(
					`input.grid-button[name="${this.props.id}"][value="${grade}"]`
				);
				input.value = grade;
				this.ActivateRadio(input.parentNode);
			}
		}
	};

	CalcPercentage = (value, percentage) => {
		return (value * percentage) / 10;
	};

	OnHandleRadio = e => {
		this.ClearRadio(e.target.name);
		this.ActivateRadio(e.target.parentNode);
		const total = this.CalcPercentage(e.target.value, this.props.percentage);

		this.props.OnCompleteCriterion({ result: { [e.target.name]: e.target.value }, total });
	};

	ActivateRadio = elem => {
		elem.classList.add("active");
	};

	ClearRadio = id => {
		document.querySelectorAll(`.grid-button-label[data-value='${id}']`).forEach(elem => {
			elem.classList.remove("active");
		});
	};
	render() {
		const buttons = (
			<div className="grid-button-container">
				<div className="grid-button-group">
					{[...Array(6)].map((x, i) => (
						<label
							className="grid-button-label rounded-circle"
							key={i}
							data-value={this.props.id}
						>
							{i}
							<input
								className="grid-button"
								type="radio"
								value={i}
								name={this.props.id}
								onChange={this.OnHandleRadio}
							/>
						</label>
					))}
				</div>
				<div className="grid-button-group">
					{[...Array(5)].map((x, i) => (
						<label
							className="grid-button-label rounded-circle"
							key={i + 6}
							data-value={this.props.id}
						>
							{i + 6}
							<input
								className="grid-button"
								type="radio"
								value={i + 6}
								name={this.props.id}
								onChange={this.OnHandleRadio}
							/>
						</label>
					))}
				</div>
			</div>
		);
		return <Fragment>{buttons}</Fragment>;
	}
}
