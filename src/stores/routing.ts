import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import createBrowserHistory from "history/createBrowserHistory";

export const routingStore = new RouterStore();
export const history = syncHistoryWithStore(
	createBrowserHistory(),
	routingStore,
);
