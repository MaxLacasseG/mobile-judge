import React, { Component } from "react";
import { connect } from "react-redux";
import AdminListItem from "./AdminListItem";
import UpdateAdminModal from "./UpdateAdminModal";
import { GetAllAdmins, DeleteAdmin } from "../../../store/actions/adminActions";
import { ClearResponse } from "../../../store/actions/responseActions";

import PropTypes from "prop-types";

class AdminList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAdmin: {},
            modal: ""
        };
        this.initialState = this.state;
    }

    componentDidMount = () => {
        this.props.GetAllAdmins();
    };
    componentWillUnmount = () => {
        this.props.ClearResponse();
    };
    DeleteAdmin = admin => {
        //Call delete action
        this.props.DeleteAdmin(admin._id);
    };

    ClearModal = () => {
        this.setState({ modal: "" });
    };

    ShowUpdateModal = admin => {
        this.setState({ selectedAdmin: admin }, () => {
            const modal = <UpdateAdminModal admin={this.state.selectedAdmin} UpdateAdmin={this.UpdateAdmin} ClearModal={this.ClearModal} />;
            this.setState({ modal }, () => {
                //Show modal box
                document.getElementById("updateModalBtn").click();
            });
        });
    };

    UpdateAdmin = newAdminInfos => {
        console.log("Update", newAdminInfos);
    };
    render() {
        const action = this.props.action;
        const adminList = this.props.admin.adminList;

        const adminListItems = adminList.map(admin => {
            return <AdminListItem admin={admin} UpdateAdmin={this.ShowUpdateModal} DeleteAdmin={this.DeleteAdmin} key={admin._id} />;
        });

        const successMessage = (
            <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                Administrateur supprimé
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.ClearResponse}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
        return (
            <div className="p-5">
                <button
                    id="updateModalBtn"
                    className="icon-button"
                    data-target="#updateAdminModal"
                    data-toggle="modal"
                    style={{ display: "hidden" }}
                />
                {this.state.modal}

                <h4 className="section-header">
                    <i className="fas fa-list-ul" />
                    {"  "}
                    Liste des utilisateurs
                </h4>
                {action.type === "DELETE_ADMIN" && action.response === "success" ? successMessage : null}
                <div className="list-group list-group-flush">{adminListItems}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    admin: state.admin,
    errors: state.errors,
    action: state.action
});

AdminList.propTypes = {
    errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    action: PropTypes.object.isRequired,
    DeleteAdmin: PropTypes.func.isRequired,
    GetAllAdmins: PropTypes.func.isRequired,
    ClearResponse: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    { GetAllAdmins, DeleteAdmin, ClearResponse }
)(AdminList);
