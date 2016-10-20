import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Router, Route, Redirect, IndexRoute, browserHistory, RouterState, RedirectFunction } from "react-router";

import App from "./containers/App";

import reducers from "./redux";

const store = createStore(reducers, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
            </Route>
        </Router>
    </Provider>

), document.getElementById("app"));
