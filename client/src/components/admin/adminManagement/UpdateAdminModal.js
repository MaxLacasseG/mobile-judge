import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @props UpdateAdmin(newAdminInfos)    function    Updates the admin profile
 * @props ClearModal                    function    Reset modal state in parent
 * @props admin                         object      the admin
 */
class UpdateAdminModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            organization: "",
            isAdmin: false
        };
        this.initialState = this.state;
    }

    //#region LIFE CYCLE METHODS
    componentDidMount = () => {
        this.SetAdminInfo(this.props.admin);
    };
    componentWillUnmount = () => {};
    //#endregion

    //#region COMPONENT METHODS
    SetAdminInfo = admin => {
        this.setState(admin);
    };

    UpdateAdmin = e => {
        document.getElementById("closeModalBtn").click();
        this.props.UpdateAdmin(this.state);
    };

    ClearForm = () => {
        this.setState(this.initialState);
        this.props.ClearModal();
    };

    OnSubmit = e => {
        e.preventDefault();
    };
    OnChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    OnCheck = e => {
        this.setState({ [e.target.name]: e.target.checked });
    };

    OnSelect = e => {
        this.setState({ [e.target.name]: e.target.selectedOptions[0].value });
    };
    //#endregion

    //#region RENDER
    render() {
        const errors = this.props.errors;
        const organizationList = [
            "Réseau Technoscience",
            "Technoscience Abitibi-Témiscamingue",
            "Technoscience Est-du-Québec",
            "Technoscience Saguenay–Lac-Saint-Jean",
            "Technoscience Mauricie, Centre-du-Québec",
            "Technoscience Estrie",
            "Technoscience Région métropolitaine",
            "Technoscience Côte-Nord",
            "Technoscience Outaouais",
            "Boite à science",
            "AEST"
        ];
        const organizationOptions = organizationList.map(org => {
            return (
                <option value={org} key={org}>
                    {org}
                </option>
            );
        });
        return (
            <Fragment>
                <div className="container">
                    <div className="modal fade" id="updateAdminModal" role="dialog" data-backdrop="static" data-keyboard="false">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-body">
                                    {/* ======== */}
                                    {/* FORM BEGINNING */}
                                    {/* ======== */}
                                    <form onSubmit={this.OnSubmit}>
                                        <div className="row">
                                            <div className="col-4">
                                                <h5>Informations</h5>
                                            </div>
                                            <div className="col-8">
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="isAdmin"
                                                        name="isAdmin"
                                                        onChange={this.OnCheck}
                                                        checked={this.state.isAdmin}
                                                    />
                                                    <label className="form-check-label" htmlFor="isAdmin">
                                                        Est super administrateur?
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Nom d'utilisateur</label>
                                            <input
                                                type="text"
                                                className={classnames("form-control", {
                                                    "is-invalid": errors.email
                                                })}
                                                name="email"
                                                id="email"
                                                placeholder="Courriel"
                                                disabled="disabled"
                                                value={this.state.email}
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                        </div>
                                        <hr />
                                        <div className="form-group">
                                            <label htmlFor="firstName">Prénom</label>
                                            <input
                                                type="text"
                                                className={classnames("form-control", {
                                                    "is-invalid": errors.firstName
                                                })}
                                                name="firstName"
                                                id="firstName"
                                                placeholder="Prénom"
                                                onChange={this.OnChange}
                                                value={this.state.firstName}
                                            />
                                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName">Nom de famille</label>
                                            <input
                                                type="text"
                                                className={classnames("form-control", {
                                                    "is-invalid": errors.lastName
                                                })}
                                                name="lastName"
                                                id="lastName"
                                                placeholder="Nom de famille"
                                                onChange={this.OnChange}
                                                value={this.state.lastName}
                                            />
                                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Numéro de téléphone à contacter durant la finale</label>
                                            <input
                                                type="tel"
                                                className={classnames("form-control", {
                                                    "is-invalid": errors.phone
                                                })}
                                                id="phone"
                                                name="phone"
                                                pattern="[0-9]{3} [0-9]{3}-[0-9]{4}"
                                                placeholder="222 222-2222"
                                                onChange={this.OnChange}
                                                value={this.state.phone}
                                            />
                                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="organization">Organisme régional</label>
                                            <select
                                                className={classnames("form-control custom-select", {
                                                    "is-invalid": errors.organization
                                                })}
                                                name="organization"
                                                id="organization"
                                                value={this.state.organization}
                                                onChange={this.OnSelect}
                                            >
                                                <option value="">Choisir un organisme</option>
                                                {organizationOptions}
                                            </select>
                                            {errors.organization && <div className="invalid-feedback">{errors.organization}</div>}
                                        </div>
                                        <hr />
                                        <button className="btn mr-3" type="button" onClick={this.UpdateAdmin}>
                                            <i className="fas fa-save" /> Modifier l'utilisateur
                                        </button>
                                        <button id="closeModalBtn" className="btn btn-default" data-dismiss="modal" onClick={this.ClearForm}>
                                            <i className="fas fa-times" /> Annuler
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
//#endregion

const mapStateToProps = state => ({
    action: state.action,
    errors: state.errors
});

UpdateAdminModal.propTypes = {
    admin: PropTypes.object.isRequired,
    UpdateAdmin: PropTypes.func.isRequired,
    ClearModal: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(UpdateAdminModal);
