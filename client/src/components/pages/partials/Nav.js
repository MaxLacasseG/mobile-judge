import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import JudgeNav from "./JudgeNav";
import ManagerNav from "./ManagerNav";
class Nav extends Component {
    render() {
        const user = this.props.auth.user;

        let nav = null;
        if (user.isJudge) {
            nav = <JudgeNav />;
        } else if (user.isManager) {
            nav = <ManagerNav />;
        }

        return <Fragment>{nav}</Fragment>;
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(Nav);
