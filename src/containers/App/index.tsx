import Main from "../Main";
import NavBar from "../NavBar";
import { UiStore } from "../../stores/";
import s from "./style.scss";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";
import Dialog from "material-ui/Dialog";
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

interface IAppProps {
	uiStore?: UiStore;
}

const theme = getMuiTheme({});

@inject("uiStore")
@observer
class App extends React.Component<IAppProps, {}> {
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

							<RaisedButton
								label="Login Google"
								primary={true}
								icon={<FontIcon className="fa fa-google" />}
							/>
						</Dialog>
					</div>
				</MuiThemeProvider>
			</BrowserRouter>
		);
	}
}

export default App;
