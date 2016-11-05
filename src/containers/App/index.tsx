import * as React from "react";
const s = require("./App.scss");

export interface Props extends React.Props<App> {

}

class App extends React.Component<Props, {}> {
    render() {
        return (
            <div className={s.site}>
                <header>
                    <h1>Logo</h1>
                </header>
                <main>
                    {this.props.children && React.cloneElement(this.props.children, {})}
                </main>
            </div>
        );
    }
}

export default App;
