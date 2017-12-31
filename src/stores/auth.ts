import { computed, action, observable } from "mobx";
import { RootStore } from "./";
import * as api from "../vendor/api";
export class AuthStore {
	protected rootStore: RootStore;
	@observable public user: any = null;
	@observable public loggeg: boolean = false;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	private syncWithLocalStorage() {

	}

	@computed
	public get isLogged() {
		return false;
	}

	@action public getInfo() {
		api.getUserInfo().then(res => {
			console.log("getInfo", res.data.user);
		});
	}

	@action
	public loginGoogle(token: string) {
		api.loginGoogle(token).then(res => {
			console.log("loginGoogle", res.data.user);
		});
	}
}