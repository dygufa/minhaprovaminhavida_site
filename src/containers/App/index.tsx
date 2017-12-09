import Main from "../Main";
import NavBar from "../NavBar";
import s from "./style.scss";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react";
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";

interface IAppProps {}

const theme = getMuiTheme({});

@observer
class App extends React.Component<IAppProps, {}> {
	public render() {
		return (
			<BrowserRouter>
				<MuiThemeProvider muiTheme={theme}>
					<div className={s.appContainer}>
						<NavBar />
						<Main />
					</div>
				</MuiThemeProvider>
			</BrowserRouter>
		);
	}
}

export default App;
