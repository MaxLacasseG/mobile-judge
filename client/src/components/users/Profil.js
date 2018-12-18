import React, { Component } from "react";
import { connect } from "react-redux";
import { GetCurrentEmploye } from "../../store/actions/employeActions";

class Profil extends Component {
    componentDidMount() {
        this.props.GetCurrentEmploye(this.props.auth.utilisateur.id);
    }

    render() {
        return <div />;
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    employe: state.employe
});

export default connect(
    mapStateToProps,
    { GetCurrentEmploye }
)(Profil);
