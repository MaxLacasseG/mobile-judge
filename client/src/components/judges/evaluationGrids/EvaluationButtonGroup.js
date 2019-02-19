import React, { Component, Fragment } from "react";

export default class EvaluationButtonGroup extends Component {
	CalcPercentage = (value, percentage) => {
		return (value * percentage) / 10;
	};

	OnHandleRadio = e => {
		this.ClearRadio(e.target.name);
		e.target.parentNode.classList.add("active");
		const total = this.CalcPercentage(e.target.value, this.props.percentage);

		this.props.OnCompleteCriterion({ result: { [e.target.name]: e.target.value }, total });
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
