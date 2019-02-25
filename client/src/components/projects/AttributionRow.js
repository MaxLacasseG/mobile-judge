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
        console.log(e.currentTarget.dataset.project, e.currentTarget.dataset.judge, e.currentTarget.dataset.period);
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
                const project = this.props.attributionInfos[period].project;
                const judge = this.props.attributionInfos[period].judge;
                let isComplete = false;

                //Checks if judgement is completed

                if (this.props.results !== undefined && !isEmpty(this.props.results[project])) {
                    if (!isEmpty(this.props.results[project][judge])) {
                        isComplete = this.props.results[project][judge].isComplete;
                    }
                }

                return (
                    <div
                        key={index}
                        className={classnames("col-md grid-cell", {
                            "grid-cell-complete": isComplete
                        })}
                        data-project={this.props.number}
                        data-judge={this.props.attributionInfos[period].judge}
                        data-period={period}
                        onClick={this.ChangeAttribution}
                    >
                        {isEmpty(this.props.attributionInfos[period].judge) ? (
                            " - "
                        ) : (
                            <div>
                                Juge {this.props.attributionInfos[period].judge}{" "}
                                {isComplete && (
                                    <span>
                                        <i className="fas fa-check" />
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                );
            });
        }
        return <Fragment>{cols}</Fragment>;
    }
}

export default AttributionRow;
