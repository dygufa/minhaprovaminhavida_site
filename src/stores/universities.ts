import { action, observable } from "mobx";
import { RootStore } from "./";
import * as api from "../vendor/api";

export class UniversitiesStore {
	protected rootStore: RootStore;

	@observable public universities: api.BasicUniversity[] = [];

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@action
	public fetch() {
		api.getUniversities().then(universities => {
			this.universities = universities.data;
		});
	}
}