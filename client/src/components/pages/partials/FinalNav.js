import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../store/actions/authActions";

/**
 * Class specific to the navigation of a final
 * @props pageTitle String  The display name of the page in the header
 * @props id
 */
class FinalNav extends Component {
	onLogout = () => {
		this.props.logoutUser(this.props.history);
	};
	render() {
		const { isAuthenticated } = this.props.auth;

		const AdminMenu = (
			<ul className="nav nav-bar justify-content-around align-items-center px-5 py-3">
				<Link to="/admin/panneau-controle" className="px-3 icon-button">
					<strong>
						<i className="fas fa-reply-all" /> Retour
					</strong>
				</Link>
				<Link
					to={`/admin/finale/${this.props.id}/vue-projets`}
					className="px-3 icon-button"
				>
					<i className="fas fa-user-friends " /> Vue par projets
				</Link>
				<Link to={`/admin/finale/${this.props.id}/vue-juges`} className="px-3 icon-button">
					<i className="fas fa-clipboard-list" /> Vue par juges
				</Link>
				<Link
					to={`/admin/finale/${this.props.id}/vue-periodes`}
					className="px-3 icon-button"
				>
					<i className="fas fa-stopwatch" /> Vue par périodes de jugement
				</Link>
				<Link to={`/admin/finale/${this.props.id}/infos`} className="px-3 icon-button">
					<i className="fas fa-cogs" /> Modifier les infos de la finale
				</Link>
			</ul>
		);
		return (
			<Fragment>
				<ul className="nav nav-bar justify-content-around align-items-center p-3">
					<li>
						<img className="logo" src="/img/logo.png" alt="" />
					</li>
					<li className="text-center">
						<h1>Portail gestionnaire</h1>
						<h3>{this.props.pageTitle}</h3>
						<h6>{this.props.finalName}</h6>
					</li>
					{isAuthenticated ? (
						<li className="nav-item text-right ">
							<Link className="nav-link" to="#" onClick={this.onLogout}>
								Déconnexion
							</Link>
							<small>
								Connecté en tant que{" "}
								{this.props.auth.user.firstName +
									" " +
									this.props.auth.user.lastName}
							</small>
							<br />
							<small>
								{this.props.auth.user.isAdmin
									? "Super administrateur"
									: "Administrateur"}
							</small>
						</li>
					) : null}
				</ul>
				{AdminMenu}
			</Fragment>
		);
	}
}
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(
	mapStateToProps,
	{ logoutUser }
)(withRouter(FinalNav));
