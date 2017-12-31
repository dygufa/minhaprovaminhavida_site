import { computed, action, observable } from "mobx";
import { RootStore } from "./";
import * as api from "../vendor/api";
export class AuthStore {
	protected rootStore: RootStore;
	@observable public user: api.User | null = null;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		const user = localStorage.getItem("user");
		this.user = user ? JSON.parse(user) : null;
	}

	private syncWithLocalStorage() {
		localStorage.setItem("user", JSON.stringify(this.user));
	}

	@computed
	public get isLogged() {
		return this.user !== null;
	}

	@action public getInfo() {
		api.getUserInfo().then(res => {
			this.user = res.data.user;
			this.syncWithLocalStorage();
		});
	}

	@action
	public loginGoogle(token: string) {
		api.loginGoogle(token).then(res => {
			this.rootStore.uiStore.loginDialog = false;
			this.user = res.data.user;
			this.syncWithLocalStorage();
		});
	}

	@action
	public loginFacebook(token: string) {
		api.loginFacebook(token).then(res => {
			this.rootStore.uiStore.loginDialog = false;
			this.user = res.data.user;
			this.syncWithLocalStorage();
		});
	}

	@action
	public logout() {
		localStorage.removeItem("user");
		localStorage.removeItem("jwt");
		this.user = null;
	}
}