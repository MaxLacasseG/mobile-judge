import React, { Component } from "react";

class NewAdminForm extends Component {
    onSubmit = e => {
        e.preventDefault();
    };
    render() {
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
            return <option value={org}>{org}</option>;
        });
        return (
            <form onSubmit={this.onSubmit} className="p-5">
                <h4 className="section-header">
                    <i className="fa fa-plus-circle" />
                    {"  "}
                    Ajouter un administrateur
                </h4>
                <div class="form-group">
                    <h6>Informations</h6>
                    <label for="email">Nom d'utilisateur</label>
                    <input type="text" class="form-control" name="email" id="email" placeholder="Courriel" />
                </div>
                <div class="form-group">
                    <label for="pwd">Mot de passe</label>
                    <input type="password" class="form-control" name="pwd" id="pwd" aria-describedby="helpId" placeholder="Mot de passe" />
                </div>
                <div class="form-group">
                    <label for="firstName">Prénom</label>
                    <input type="text" class="form-control" name="firstName" id="firstName" placeholder="Prénom" />
                </div>
                <div class="form-group">
                    <label for="lastName">Nom de famille</label>
                    <input type="text" class="form-control" name="lastName" id="lastName" placeholder="Nom de famille" />
                </div>
                <div class="form-group">
                    <label for="phone">Numéro de téléphone à contacter durant la finale</label>
                    <input type="tel" class="form-control" id="phone" name="phone" pattern="[0-9]{3} [0-9]{3}-[0-9]{4}" placeholder="222 222-2222" />
                </div>
                <div class="form-group">
                    <label for="organization">Organisme régional</label>
                    <select class="custom-select" name="organization" id="organization">
                        <option selected>Choisir un organisme</option>
                        {organizationOptions}
                    </select>
                </div>
                <button type="submit" class="btn form-control">
                    <i className="fa fa-plus-circle fa-lg" /> Créer l'utilisateur
                </button>
            </form>
        );
    }
}

export default NewAdminForm;
