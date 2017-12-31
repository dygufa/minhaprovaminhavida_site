import s from "./style.scss";
import { AuthStore, UiStore } from "../../stores/";
import * as React from "react";
import { observer, inject } from "mobx-react";
import { AppBar, FlatButton } from "material-ui";

interface INavBarProps {
	authStore?: AuthStore;
	uiStore?: UiStore;
}

@inject("authStore", "uiStore")
@observer
class NavBar extends React.Component<INavBarProps, {}> {
	public render() {
		return (
			<AppBar
				className={s.navBar}
				title="Minha Prova Minha Vida"
				iconElementRight={this.props.authStore!.isLogged ? (
					<div>
						Olá, {this.props.authStore!.user!.name}
						<a role="button" onClick={() => this.props.authStore!.logout()}>Logout</a>
					</div>
				) : (
						<FlatButton
							label={this.props.authStore!.isLogged ? "Adicionar arquivo" : "Login"}
							onClick={() => {
								this.props.uiStore!.loginDialog = true;
							}}
						/>
					)}
			/>
		);
	}
}

export default NavBar;
