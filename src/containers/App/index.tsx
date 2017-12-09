import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react";
// import { Route } from "react-router";

interface IAppProps {}

@observer
class App extends React.Component<IAppProps, {}> {
	public render() {
		return (
			<BrowserRouter>
				<div>Hallo</div>
			</BrowserRouter>
		);
	}
}

export default App;
