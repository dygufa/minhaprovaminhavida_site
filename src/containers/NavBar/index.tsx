import s from "./style.scss";
import { AuthStore, UiStore } from "../../stores/";
import * as React from "react";
import { observer, inject } from "mobx-react";
import { AppBar, FlatButton, Avatar, Popover, Menu, MenuItem, RaisedButton } from "material-ui";

interface INavBarProps {
	authStore?: AuthStore;
	uiStore?: UiStore;
}

interface INavBarState {
	userMenuAnchorElement: any;
	userMenuOpen: boolean;
}

@inject("authStore", "uiStore")
@observer
class NavBar extends React.Component<INavBarProps, INavBarState> {
	public state = {
		userMenuAnchorElement: undefined,
		userMenuOpen: false
	}

	private handleClick = (event: any) => {
		event.preventDefault();

		this.setState({
			userMenuOpen: true,
			userMenuAnchorElement: event.currentTarget
		});
	}

	private handleRequestClose = () => {
		this.setState({
			userMenuOpen: false
		});
	}

	public render() {
		return (
			<AppBar
				className={s.navBar}
				title="Minha Prova Minha Vida"
				iconElementRight={this.props.authStore!.isLogged ? (
					<div style={{
						display: "flex",
						alignItems: "center",
						marginRight: "10px"
					}}>
						<RaisedButton
							label="Adicionar arquivo"
							onClick={() => {
								this.props.uiStore!.addFileDialog = true;
							}}
							style={{
								marginRight: "30px"
							}}
						/>

						<Avatar
							src={this.props.authStore!.user!.avatar}
							onClick={this.handleClick}
							style={{ cursor: "pointer" }}
						/>

						<Popover
							open={this.state.userMenuOpen}
							anchorEl={this.state.userMenuAnchorElement}
							anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
							targetOrigin={{ horizontal: 'left', vertical: 'top' }}
							onRequestClose={this.handleRequestClose}
						>
							<Menu>
								<MenuItem
									primaryText="Sair"
									onClick={() => this.props.authStore!.logout()}
								/>
							</Menu>
						</Popover>
					</div>

				) : (
					<FlatButton
						label="Entrar"
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
