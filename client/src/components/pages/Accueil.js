import AutocompleteTextField from "../common/AutocompleteTextField";
import React, { Component } from "react";
import { connect } from "react-redux";
class Accueil extends Component {
    render() {
        return (
            <div>
                <h1>Accueil</h1>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    {}
)(Accueil);
