import React, { Component } from "react";
import { connect } from "react-redux";
import AdminListItem from "./AdminListItem";
import UpdateAdminModal from "./UpdateAdminModal";
import { GetAllAdmins, DeleteAdmin, UpdateAdmin } from "../../../store/actions/adminActions";
import { ClearResponse } from "../../../store/actions/responseActions";

import PropTypes from "prop-types";

/**
 * Class the fetch all the admins, manage deletion and update infos
 * @props admin         object  Admin reducer
 * @props errors        object  Errors reducer
 * @props message       object  Action response reducer, manages success message and alert to user
 * @props GetAllAdmins  func    Redux action that fetch all admins from db
 * @props DeleteAdmin,  func    Reduc action that deletes admin using it's id
 * @props UpdateAdmin,  func    Redux action that updates infos returned from modal box
 * @props ClearResponse func    Redux action that clear the success message after the alert is clicked
 */
class AdminList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAdmin: {},
            modal: ""
        };
        this.initialState = this.state;
    }

    //#region LIFE CYCLE METHODS
    componentDidMount = () => {
        this.props.GetAllAdmins();
    };
    componentWillUnmount = () => {
        this.props.ClearResponse();
    };
    //#endregion

    //#region COMPONENT METHODS
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
        this.props.UpdateAdmin(newAdminInfos);
    };

    ClearModal = () => {
        this.setState({ modal: "" });
    };

    DeleteAdmin = admin => {
        //Call delete action
        this.props.DeleteAdmin(admin._id);
    };
    //#endregion

    //#region RENDER
    render() {
        const action = this.props.action;
        const adminList = this.props.admin.adminList;

        const adminListItems = adminList.map(admin => {
            return <AdminListItem admin={admin} UpdateAdmin={this.ShowUpdateModal} DeleteAdmin={this.DeleteAdmin} key={admin._id} />;
        });

        const deleteSuccessMessage = (
            <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                Administrateur supprimé
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.ClearResponse}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );

        const updateSuccessMessage = (
            <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                Administrateur modifié
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
                {action.type === "DELETE_ADMIN" && action.response === "success" ? deleteSuccessMessage : null}
                {action.type === "UPDATE_ADMIN" && action.response === "success" ? updateSuccessMessage : null}
                <div className="list-group list-group-flush">{adminListItems}</div>
            </div>
        );
    }
}
//#endregion

const mapStateToProps = state => ({
    admin: state.admin,
    errors: state.errors,
    action: state.action
});

AdminList.propTypes = {
    admin: PropTypes.object.isRequired,
    errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    action: PropTypes.object.isRequired,
    DeleteAdmin: PropTypes.func.isRequired,
    GetAllAdmins: PropTypes.func.isRequired,
    ClearResponse: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    { GetAllAdmins, DeleteAdmin, UpdateAdmin, ClearResponse }
)(AdminList);
