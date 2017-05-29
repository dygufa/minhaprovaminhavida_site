import * as React from "react";
import {Button, IconButton} from "react-toolbox/lib/button";

const s = require("./App.scss");

export interface Props extends React.Props<App> {

}

class App extends React.Component<Props, {}> {
    render() {
        return (
            <div className={s.site}>
                <header className={s.header}>
					<div className="container">
                        <div className={s.headerContent}>
                            <h1>Minha prova minha vida</h1>
                            <div>
                                <Button raised primary>
                                    <i className="fa fa-facebook" aria-hidden="true"></i> Login Facebook
                                </Button>
                            </div>
                        </div>
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
