import { RootStore } from "./";
import * as api from "../vendor/api";

export class CoursesStore {
	protected rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	public getByCode(code: string) {
		return api.getCourses({
			code
		})
	}
}