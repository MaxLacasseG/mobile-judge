import React, { Component } from "react";

class NewAdminForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pwd: "",
            firstName: "",
            lastName: "",
            phone: "",
            organization: "",
            isAdmin: false
        };
        this.initialState = this.state;
    }

    componentDidMount=()=>{
        this.onReset();
    }
    onReset = () => {
        this.setState(this.initialState, () => {
            console.log("reset");
        });
    };
    onSubmit = e => {
        e.preventDefault();
        this.onReset();
       
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onCheck = e=>{
        this.setState({[e.target.name]:e.target.checked})
    }

    onSelect = e=>{
        this.setState({[e.target.name]:e.target.selectedOptions[0].value})
    }
   
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
            return <option value={org} key={org}>{org}</option>;
        });
        return (
            <form onSubmit={this.onSubmit} className="p-5" autoComplete="nope">
            
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
                        <input type="hidden" value="no-password" />
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="isAdmin"
                                name="isAdmin"
                                onChange={this.onCheck}
                                value={this.state.isAdmin}
                                
                            />
                            <label className="form-check-label" htmlFor="isAdmin">
                                Est super administrateur?
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Nom d'utilisateur</label>
                    <input type="text" className="form-control" name="email" id="email" placeholder="Courriel" onChange={this.onChange} value={this.state.email} autoComplete="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Mot de passe</label>
                    <input type="password" className="form-control" name="pwd" id="pwd" placeholder="Mot de passe" onChange={this.onChange} value={this.state.pwd} autoComplete="new-password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Prénom</label>
                    <input type="text" className="form-control" name="firstName" id="firstName" placeholder="Prénom" onChange={this.onChange} value={this.state.firstName}/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Nom de famille</label>
                    <input type="text" className="form-control" name="lastName" id="lastName" placeholder="Nom de famille" onChange={this.onChange} value={this.state.lastName}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Numéro de téléphone à contacter durant la finale</label>
                    <input type="tel" className="form-control" id="phone" name="phone" pattern="[0-9]{3} [0-9]{3}-[0-9]{4}" placeholder="222 222-2222" onChange={this.onChange} value={this.state.phone}/>
                </div>
                <div className="form-group">
                    <label htmlFor="organization">Organisme régional</label>
                    <select className="custom-select" name="organization" id="organization" value={this.state.organization} onChange={this.onSelect}>
                        <option value="">Choisir un organisme</option>
                        {organizationOptions}
                    </select>
                </div>
                <button type="submit" className="btn form-control">
                    <i className="fa fa-plus-circle fa-lg" /> Créer l'utilisateur
                </button>
            </form>
        );
    }
}

export default NewAdminForm;
