import { action, observable } from "mobx";
import { RootStore } from "./";
import * as api from "../vendor/api";

export class FilesStore {
	protected rootStore: RootStore;

	@observable public files: api.File[] = [];
	@observable public isLoadingSearchResults: boolean = false;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@action
	public fetch() {
		api.getFiles().then(files => {
			console.log(files);
		});
	}

	@action
	public addFile(newFile: api.NewFile) {
		api.addFile(newFile);
	}
}