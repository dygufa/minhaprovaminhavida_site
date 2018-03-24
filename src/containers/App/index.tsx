import Main from "../Main";
import NavBar from "../NavBar";
import { UiStore, AuthStore } from "../../stores/";
import s from "./style.scss";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";
import LoginDialog from "../../components/dialogs/LoginDialog/";
import SendFileDialog from "../SendFileDialog/";

interface IAppProps {
	uiStore?: UiStore;
	authStore?: AuthStore;
}

const theme = getMuiTheme({});

@inject("uiStore", "authStore")
@observer
class App extends React.Component<IAppProps, {}> {
	private responseGoogle = (response: any) => {
		console.log(response);
		this.props.authStore!.loginGoogle(response.accessToken);
	}

	private responseFacebook = (response: any) => {
		console.log(response);
		this.props.authStore!.loginFacebook(response.accessToken);
	}

	private onCloseLogin = () => {
		this.props.uiStore!.loginDialog = false;
	}

	private onCloseAddFile = () => {
		this.props.uiStore!.addFileDialog = false;
	}

	public render() {
		return (
			<BrowserRouter>
				<MuiThemeProvider muiTheme={theme}>
					<div className={s.appContainer}>
						<NavBar />
						<Main />

						<LoginDialog
							open={this.props.uiStore!.loginDialog}
							onClose={this.onCloseLogin}
							responseFacebook={this.responseFacebook}
							responseGoogle={this.responseGoogle}
						/>

						<SendFileDialog
							open={this.props.uiStore!.addFileDialog}
							onClose={this.onCloseAddFile}
						/>
					</div>
				</MuiThemeProvider>
			</BrowserRouter>
		);
	}
}

export default App;
