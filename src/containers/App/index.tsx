import * as React from "react";
const s = require("./App.scss");

export interface Props extends React.Props<App> {

}

class App extends React.Component<Props, {}> {
    render() {
        return (
            <div className={s.site}>
                <header className={s.header}>
					<div className="container">
                    	<h1>Logo</h1>
					</div>
                </header>
                <main className={s.main}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default App;
