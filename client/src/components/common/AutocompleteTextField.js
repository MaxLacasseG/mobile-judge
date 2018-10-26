import React, { Component } from "react";
import classnames from "classnames";

class AutocompleteTextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liste: [],
            listeAffichee: [],
            afficherBoiteChoix: false,
            recherche: "",
            itemsMax: null,
            name: this.props.name,
            id: this.props.id,
            placeholder: this.props.placeholder,
            disabled: this.props.disabled,
            required: this.props.required,
            addClass: this.props.addClass,
            readOnly: this.props.readOnly,
            error: this.props.error
        };
        this.onChange = this.onChange.bind(this);
        this.AfficherListeDeroulante = this.AfficherListeDeroulante.bind(this);
        this.CacherListeDeroulante = this.CacherListeDeroulante.bind(this);
        this.AjouterChoix = this.AjouterChoix.bind(this);
    }
    componentDidMount() {
        this.setState({
            liste: this.props.liste,
            listeAffichee: this.props.liste,
            itemsMax: this.props.itemsMax || 10
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.recherche !== prevState.recherche) {
            let listeFiltree = this.state.liste.filter(elem => {
                let test = RegExp(`${this.state.recherche}`, "gi");
                return test.test(elem);
            });
            console.log(listeFiltree);
            this.setState({ listeAffichee: listeFiltree });
        }
        if (this.props.liste !== prevProps.liste) {
            this.setState({
                liste: this.props.liste,
                listeAffichee: this.props.liste,
                itemsMax: this.props.itemsMax || 10
            });
        }
    }

    onChange(e) {
        this.setState({ recherche: e.target.value });
    }

    AfficherListeDeroulante(e) {
        this.setState({ afficherBoiteChoix: true });
    }
    CacherListeDeroulante(e) {
        this.setState({ afficherBoiteChoix: false });
    }
    AjouterChoix(e) {
        this.setState({ recherche: e.target.innerHTML }, () => {
            this.CacherListeDeroulante();
        });
    }

    render() {
        const propositions = this.state.listeAffichee.map(
            (proposition, index) => {
                return (
                    index < this.state.itemsMax && (
                        <p
                            key={index}
                            onClick={this.AjouterChoix}
                            className="border border-white bg-info text-white pt-2 pb-2 m-0"
                        >
                            {proposition}
                        </p>
                    )
                );
            }
        );
        return (
            <div className={this.state.addClass}>
                <label htmlFor={this.props.id}>{this.props.label}</label>

                <input
                    type="text"
                    onFocus={this.AfficherListeDeroulante}
                    value={this.state.recherche}
                    onChange={this.onChange}
                    name={this.state.name}
                    id={this.state.id}
                    placeholder={this.state.placeholder}
                    error={this.state.error}
                    disabled={this.state.disabled}
                    required={this.state.required}
                    readOnly={this.state.readOnly}
                    className={classnames("autocomplete-search form-control", {
                        "is-invalid": this.state.error
                    })}
                />
                {this.state.afficherBoiteChoix &&
                    this.state.recherche.length > 0 && (
                        <div className="search-results-elements">
                            {propositions}
                        </div>
                    )}
                {this.state.error && (
                    <div className="invalid-feedback">{this.state.error}</div>
                )}
            </div>
        );
    }
}

export default AutocompleteTextField;
