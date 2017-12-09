import s from "./style.scss";
import { AuthStore } from "../../models/auth";
import * as React from "react";
import { observer, inject } from "mobx-react";
import { AppBar, FlatButton } from "material-ui";

interface INavBarProps {
	authStore?: AuthStore;
}

@inject("authStore")
@observer
class NavBar extends React.Component<INavBarProps, {}> {
	public render() {
		return (
			<AppBar
				className={s.navBar}
				title="Minha Prova Minha Vida"
				iconElementRight={
					<FlatButton
						label={
							this.props.authStore!.isLogged
								? "Adicionar arquivo"
								: "Login"
						}
					/>
				}
			/>
		);
	}
}

export default NavBar;
