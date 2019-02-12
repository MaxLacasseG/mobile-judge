import React, { Component } from "react";
import { connect } from "react-redux";
import { LogoutJudge } from "../../store/actions/judgeActions";
class JudgeNav extends Component {
    render() {
        return (
            <div className="btn btn-reseau" onClick={this.props.LogoutJudge}>
                Déconnecter
            </div>
        );
    }
}

export default connect(
    null,
    { LogoutJudge }
)(JudgeNav);
