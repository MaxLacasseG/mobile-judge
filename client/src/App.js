import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import setAuthHeader from "./utils/setAuthHeaders";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";

//Components
import Accueil from "./components/pages/Accueil";
import Page404 from "./components/pages/Page404";
import Navbar from "./components/pages/partials/Navbar";

import Bienvenue from "./components/auth/Bienvenue";
import Connexion from "./components/auth/ConnexionForm";
import MdpOubli from "./components/auth/MdpOubli";
import MdpChangement from "./components/auth/MdpChangement";

import Finale from "./components/finales/Finale";
import Importation from "./components/finales/Importation";
import Assignation from "./components/finales/Assignation";
import Exportation from "./components/finales/Exportation";

import JugesAccueil from "./components/juges/ConnexionJuges";
import SelectionFinale from "./components/finales/SelectionFinale";

//AUTH CHECK
//if there is a token already in localstorage,
//Allows to keep users info if page reloads
if (localStorage.jwtToken) {
    //Set authorization header for each request
    setAuthHeader(localStorage.jwtToken);
    //Decode user's token
    const decoded = jwt_decode(localStorage.jwtToken);
    //Set current user and authentication
    store.dispatch(setCurrentUser(decoded));

    //Checks expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        //Redirects
        window.location.href = "/connexion";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Bienvenue />
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={JugesAccueil} />
                                <Route exact path="/selection-finale" component={SelectionFinale} />
                                <Route exact path="/admin" component={Accueil} />
                                <Route exact path="/admin-connexion" component={Connexion} />
                                <Route exact path="/oubli-mot-de-passe" component={MdpOubli} />
                                <Route exact path="/modification-mot-de-passe/*" component={MdpChangement} />
                                <PrivateRoute exact path="/selection-finale" component={Finale} />
                                <PrivateRoute exact path="/importation" component={Importation} />
                                <PrivateRoute exact path="/assignation" component={Assignation} />
                                <PrivateRoute exact path="/exportation" component={Exportation} />
                                <Route path="/*" component={Page404} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
