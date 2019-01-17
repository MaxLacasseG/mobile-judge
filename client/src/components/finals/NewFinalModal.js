import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @props CreateFinal    function    Updates the admin profile
 * @props ClearModal                    function    Reset modal state in parent
 * @props final                         object      the final
 */
class NewFinalModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.initialState = this.state;
    }

    //#region LIFE CYCLE METHODS
    componentDidMount = () => {
        console.log("Modal mounted");
        this.SetFinalInfo(this.props.finalInfos);
    };
    componentWillUnmount = () => {
        console.log("Modal unmounted");
    };
    //#endregion

    //#region COMPONENT METHODS
    SetFinalInfo = finalInfos => {
        this.setState(finalInfos);
    };

    CreateFinal = e => {
        document.getElementById("closeModalBtn").click();
        this.props.CreateFinal(this.state);
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

    RenderDate = date => {
        console.log(date);
        return new Date(date).toLocaleDateString("fr-CA", { timeZone: "UTC" });
    };
    //#endregion

    //#region RENDER
    render() {
        const errors = this.props.errors;
        const { event, judges, participants, projects } = this.state;

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
                    <div className="modal fade" id="createFinalModal" role="dialog" data-backdrop="static" data-keyboard="false">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-body">
                                    {/* ======== */}
                                    {/* FORM BEGINNING */}
                                    {/* ======== */}
                                    <form onSubmit={this.OnSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h5>Confirmation des informations</h5>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="finalName">Nom de la finale</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="finalName"
                                                    id="finalName"
                                                    value={event ? event.longName : ""}
                                                    disabled="disabled"
                                                />
                                            </div>
                                            {/** TODO: Modal*/}
                                            <label class="custom-control custom-radio">
                                                <input type="radio" name="" id="" value="checkedValue" class="custom-control-input" />
                                                <span class="custom-control-indicator" />
                                                <span class="custom-control-description" />
                                            </label>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="finalName">Date de début</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="finalName"
                                                    id="finalName"
                                                    value={event ? this.RenderDate(event.eventDateStart) : ""}
                                                    disabled="disabled"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="finalName">Date de fin</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="finalName"
                                                    id="finalName"
                                                    value={event ? this.RenderDate(event.eventDateEnd) : ""}
                                                    disabled="disabled"
                                                />
                                            </div>
                                            <hr />
                                            <div className="form-group col-md-4">
                                                <label htmlFor="finalName">Nb de participants</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="finalName"
                                                    id="finalName"
                                                    value={projects ? projects.length + " projets" : ""}
                                                    disabled="disabled"
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="finalName">Nb de projets</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="finalName"
                                                    id="finalName"
                                                    value={participants ? participants.length + " participants" : ""}
                                                    disabled="disabled"
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="finalName">Nb de juges</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="finalName"
                                                    id="finalName"
                                                    value={judges ? judges.length + " juges" : ""}
                                                    disabled="disabled"
                                                />
                                            </div>
                                        </div>
                                        <hr />
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
                                        <button className="btn mr-3" type="button" onClick={this.CreateFinal}>
                                            <i className="fas fa-save" /> Créer la finale
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

NewFinalModal.propTypes = {
    finalInfos: PropTypes.object.isRequired,
    CreateFinal: PropTypes.func.isRequired,
    ClearModal: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(NewFinalModal);
