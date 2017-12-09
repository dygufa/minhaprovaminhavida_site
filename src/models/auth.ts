import { computed } from "mobx";

export class AuthStore {
	@computed
	public get isLogged() {
		return false;
	}
}

export const authStore = new AuthStore();
