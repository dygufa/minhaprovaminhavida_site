import Main from "../Main";
import NavBar from "../NavBar";
import { UiStore, AuthStore } from "../../stores/";
import s from "./style.scss";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import GoogleLogin from "react-google-login";

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
	}

	public render() {
		return (
			<BrowserRouter>
				<MuiThemeProvider muiTheme={theme}>
					<div className={s.appContainer}>
						<NavBar />
						<Main />

						<Dialog
							title="Fazer login"
							modal={false}
							open={this.props.uiStore!.loginDialog}
							onRequestClose={() => {

							}}
						>
							Escolha uma das opções abaixo para fazer login: <br />

							<GoogleLogin
								clientId="656387297871-3naai0hp1kni6ehhr8tk5htc8j9bg7dj.apps.googleusercontent.com"
								onSuccess={this.responseGoogle}
								onFailure={this.responseGoogle}
								tag="div"
								style={{}}
							>
								<RaisedButton
									label="Login Google"
									primary={true}
									icon={<FontIcon className="fa fa-google" />}
								/>
							</GoogleLogin>

						</Dialog>
					</div>
				</MuiThemeProvider>
			</BrowserRouter>
		);
	}
}

export default App;
