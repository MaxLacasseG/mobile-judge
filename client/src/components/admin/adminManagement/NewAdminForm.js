import React, { Component } from "react";
import { connect } from "react-redux";
import { AddAdmin } from "../../../store/actions/adminActions";
import { ClearResponse } from "../../../store/actions/responseActions";
import PropTypes from "prop-types";
import classnames from "classnames";

class NewAdminForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pwd: "",
            pwd2: "",
            firstName: "",
            lastName: "",
            phone: "",
            organization: "",
            isAdmin: false
        };
        this.initialState = this.state;
    }

    componentWillUnmount = () => {
        this.props.ClearResponse();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.action.response !== prevProps.action.response && this.props.action.response === "success") {
            this.ResetForm();
        }
    };

    ResetForm = () => {
        this.setState(this.initialState);
    };
    OnSubmit = e => {
        e.preventDefault();
        this.props.AddAdmin(this.state);
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

    render() {
        const errors = this.props.errors;
        const action = this.props.action;

        const successMessage = (
            <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                Administrateur ajouté
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.ClearResponse}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );

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
            <form onSubmit={this.OnSubmit} className="p-5" autoComplete="nope">
                <input id="username" style={{ display: "none" }} type="text" name="fakeusernameremembered" />
                <input id="password" style={{ display: "none" }} type="password" name="fakepasswordremembered" />
                <h4 className="section-header">
                    <i className="fa fa-plus-circle" />
                    {"  "}
                    Ajouter un administrateur
                </h4>
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
                        onChange={this.OnChange}
                        value={this.state.email}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Mot de passe</label>
                    <input
                        type="password"
                        className={classnames("form-control", {
                            "is-invalid": errors.pwd
                        })}
                        name="pwd"
                        id="pwd"
                        placeholder="Mot de passe"
                        onChange={this.OnChange}
                        value={this.state.pwd}
                    />
                    {errors.pwd && <div className="invalid-feedback">{errors.pwd}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Veuillez confirmer le mot de passe</label>
                    <input
                        type="password"
                        className={classnames("form-control", {
                            "is-invalid": errors.pwd2
                        })}
                        name="pwd2"
                        id="pwd2"
                        placeholder="Mot de passe"
                        onChange={this.OnChange}
                        value={this.state.pwd2}
                    />
                    {errors.pwd2 && <div className="invalid-feedback">{errors.pwd2}</div>}
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
                <button type="submit" className="btn form-control">
                    <i className="fa fa-plus-circle fa-lg" /> Créer l'utilisateur
                </button>
                {action.type === "ADD_NEW_ADMIN" && action.response === "success" ? successMessage : null}
            </form>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    action: state.action
});

NewAdminForm.propTypes = {
    errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    action: PropTypes.object.isRequired,
    AddAdmin: PropTypes.func.isRequired,
    ClearResponse: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    { AddAdmin, ClearResponse }
)(NewAdminForm);
