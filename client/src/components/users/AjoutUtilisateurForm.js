import React, { Component } from "react";
import { connect } from "react-redux";
import { AjouterEmploye } from "../../store/actions/employeActions";
import CustomInput from "../common/CustomInput";

class AjoutUtilisateurForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courriel: "",
            prenom: "",
            nom: "",
            code: "",
            admin: "",
            semainesTravaillees: [],

            titre: "",
            hresSemaine: 35,
            tauxHoraire: 20,
            tauxReer: null,
            assurancesColl: null,
            nbJoursVacances: null,
            nbJoursMaladies: null,

            totalVacances: null,
            totalAssurances: null,
            totalCongesFeries: null,
            totalMaladies: null,
            totalRepriseTemps: null,
            totalCongesSociaux: null,

            tels: [],
            adresse: "",
            ville: "",
            codePostal: "",

            urgence_tel: "",
            urgence_contact: "",
            error: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            courriel: this.state.courriel,
            prenom: this.state.prenom,
            nom: this.state.nom,
            code: this.state.code,
            mdp: this.state.mdp,
            admin: this.state.admin,
            semainesTravaillees: this.state.semainesTravaillees,
            contrat: {
                titre: this.state.titre,
                hresSemaine: this.state.hresSemaine,
                tauxHoraire: this.state.tauxHoraire,
                tauxReer: this.state.tauxReer,
                assurancesColl: this.state.assurancesColl,
                nbJoursVacances: this.state.nbJoursVacances,
                nbJoursMaladies: this.state.nbJoursMaladies
            },
            totalHresReprises: {
                totalVacances: this.state.totalVacances,
                totalAssurances: this.state.totalAssurances,
                totalCongesFeries: this.state.totalCongesFeries,
                totalMaladies: this.state.totalMaladies,
                totalRepriseTemps: this.state.totalRepriseTemps,
                totalCongesSociaux: this.state.totalCongesSociaux
            },
            contact: {
                tels: this.state.tels,
                adresse: this.state.adresse,
                ville: this.state.ville,
                codePostal: this.state.codePostal,
                urgence: [
                    {
                        tel: this.state.urgence_tel,
                        contact: this.state.urgence.urgence_contact
                    }
                ]
            }
        };
        this.props.AjouterEmploye(newUser);
    }

    render() {
        const error = {};
        return (
            <form onSubmit={this.onSubmit} className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p className="lead">Infos personnelles</p>
                    </div>
                </div>
                <div className="row form-group">
                    <CustomInput
                        type="text"
                        name="code"
                        id="code"
                        label="Code d'employé"
                        onChange={this.onChange}
                        value={this.state.code}
                        addClass="col-md-6"
                        error={error.code}
                    />
                </div>
                <div className="row form-group">
                    {/*  Infos personnelles */}
                    <CustomInput
                        type="text"
                        name="prenom"
                        id="prenom"
                        label="Prénom"
                        onChange={this.onChange}
                        value={this.state.prenom}
                        addClass="col-md-6"
                        error={error.prenom}
                    />
                    <CustomInput
                        type="text"
                        name="nom"
                        id="nom"
                        label="Nom"
                        onChange={this.onChange}
                        value={this.state.nom}
                        addClass="col-md-6"
                        error={error.nom}
                    />
                </div>
                <div className="row form-group">
                    <CustomInput
                        type="text"
                        name="courriel"
                        id="courriel"
                        label="Courriel"
                        onChange={this.onChange}
                        value={this.state.courriel}
                        addClass="col-md-6"
                        error={error.courriel}
                    />
                    <CustomInput
                        type="password"
                        name="mdp"
                        id="mdp"
                        label="Mot de passe"
                        onChange={this.onChange}
                        value={this.state.mdp}
                        addClass="col-md-6"
                        error={error.mdp}
                    />
                </div>
                <div className="row" />
                <hr />
                {/*  Contrat */}
                <div className="row">
                    <div className="col-md-12">
                        <p className="lead">Contrat</p>
                    </div>
                </div>
                <div className="row form-group">
                    <CustomInput
                        type="text"
                        name="titre"
                        id="titre"
                        label="Titre d'emploi"
                        onChange={this.onChange}
                        value={this.state.titre}
                        addClass="col-md-6"
                        error={error.titre}
                    />
                    <CustomInput
                        type="number"
                        name="hresSemaines"
                        id="hresSemaines"
                        label="Heures par semaine"
                        min="0"
                        step="1"
                        onChange={this.onChange}
                        value={this.state.hresSemaines}
                        addClass="col-md-3"
                        error={error.hresSemaines}
                    />
                    <CustomInput
                        type="number"
                        name="tauxHoraire"
                        id="tauxHoraire"
                        label="Taux horaire"
                        min="0"
                        step="1"
                        onChange={this.onChange}
                        value={this.state.tauxHoraire}
                        addClass="col-md-3"
                        error={error.tauxHoraire}
                    />
                </div>
                <div className="row form-group">
                    <CustomInput
                        type="number"
                        name="assuranceColl"
                        id="assuranceColl"
                        label="Assurance collective"
                        min="1"
                        max="3"
                        step="1"
                        onChange={this.onChange}
                        value={this.state.assuranceColl}
                        addClass="col-md-4"
                        error={error.assuranceColl}
                    />
                    <CustomInput
                        type="number"
                        name="nbJoursVacances"
                        id="nbJoursVacances"
                        label="Jours de vacances annuels"
                        min="0"
                        step="1"
                        onChange={this.onChange}
                        value={this.state.nbJoursVacances}
                        addClass="col-md-4"
                        error={error.nbJoursVacances}
                    />
                    <CustomInput
                        type="number"
                        name="nbJoursMaladies"
                        id="nbJoursMaladies"
                        label="Jours maladie annuels"
                        min="0"
                        step="1"
                        onChange={this.onChange}
                        value={this.state.nbJoursMaladies}
                        addClass="col-md-4"
                        error={error.nbJoursMaladies}
                    />
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <p className="lead">Heures en banque</p>
                    </div>
                </div>
                <div className="row form-group">
                    <CustomInput
                        type="number"
                        name="totalVacances"
                        id="totalVacances"
                        label="Total de vacances"
                        min="0"
                        step="1"
                        onChange={this.onChange}
                        value={this.state.totalVacances}
                        addClass="col-md-4"
                        error={error.totalVacances}
                    />
                    <CustomInput
                        type="number"
                        name="totalAssurances"
                        id="totalAssurances"
                        label="Total assurances"
                        min="1"
                        max="3"
                        step="1"
                        onChange={this.onChange}
                        value={this.state.totalAssurances}
                        addClass="col-md-4"
                        error={error.totalAssurances}
                    />
                    <CustomInput
                        type="number"
                        name="totalCongesFeries"
                        id="totalCongesFeries"
                        label="Total des congés fériés"
                        min="1"
                        max="3"
                        step="1"
                        onChange={this.onChange}
                        value={this.state.totalCongesFeries}
                        addClass="col-md-4"
                        error={error.totalCongesFeries}
                    />
                </div>
                <div className="form-group row">
                    <CustomInput
                        type="number"
                        name="totalMaladies"
                        id="totalMaladies"
                        label="Total des journées maladies"
                        min="1"
                        max="3"
                        step="1"
                        onChange={this.onChange}
                        value={this.state.totalMaladies}
                        addClass="col-md-4"
                        error={error.totalMaladies}
                    />
                    <CustomInput
                        type="number"
                        name="totalRepriseTemps"
                        id="totalRepriseTemps"
                        label="Total des heures reprises"
                        min="1"
                        max="3"
                        step="1"
                        onChange={this.onChange}
                        value={this.state.totalRepriseTemps}
                        addClass="col-md-4"
                        error={error.totalRepriseTemps}
                    />
                    <CustomInput
                        type="number"
                        name="totalCongesSociaux"
                        id="totalCongesSociaux"
                        label="Total des congés sociaux"
                        min="1"
                        max="3"
                        step="1"
                        onChange={this.onChange}
                        value={this.state.totalCongesSociaux}
                        addClass="col-md-4"
                        error={error.totalCongesSociaux}
                    />
                </div>
                {/* tels: this.state.tels,
                adresse: this.state.adresse,
                ville: this.state.ville,
                codePostal: this.state.codePostal,
                urgence: [
                    {
                        tel: this.state.urgence_tel,
                        contact: this.state.urgence.urgence_contact
                    }
                ] */}
                <div className="row form-group">
                    <div className="col-md-12">
                        <button
                            type="submit"
                            className="btn btn-md btn-primary"
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default connect(
    null,
    { AjouterEmploye }
)(AjoutUtilisateurForm);
