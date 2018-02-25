import { action, observable } from "mobx";
import { RootStore } from "./";
import * as api from "../vendor/api";

// function randomElement<T>(ts: T[]) {
// 	return ts[Math.floor(Math.random() * ts.length)];
// }

// function sleep(milliseconds: number) {
// 	return new Promise(resolve => setTimeout(resolve, milliseconds));
// }

export class FilesStore {
	protected rootStore: RootStore;

	// // read-only data
	// @observable public universities: IUniversity[] = [];
	// @observable public disciplines: IDiscipline[] = [];
	// @observable public teachers: ITeacher[] = [];

	// // user data
	// @observable public query: string = "";
	// @observable public selectedDiscipline: IDiscipline | null = null;
	// @observable public selectedUniversity: IUniversity | null = null;
	// @observable public selectedTeacher: ITeacher | null = null;

	// // results
	// @observable public didError: boolean = false;
	@observable public files: api.File[] = [];
	@observable public isLoadingSearchResults: boolean = false;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		// this.updateCategories()
	}

	// @action.bound
	// private async search() {
	// 	console.log("fileStore.search");
	// 	try {
	// 		this.isLoadingSearchResults = true;
	// 		this.didError = false;

	// 		const teachers = this.selectedTeacher
	// 			? [this.selectedTeacher]
	// 			: this.teachers;
	// 		const disciplines = this.selectedDiscipline
	// 			? [this.selectedDiscipline]
	// 			: this.disciplines;
	// 		const universities = this.selectedUniversity
	// 			? [this.selectedUniversity]
	// 			: this.universities;

	// 		const results = this.query === "oxe" ? 0 : 5;

	// 		await sleep(1000);

	// 		runInAction(() => {
	// 			this.files = [...new Array(results)].map<IFile>(() => ({
	// 				id: Math.random() + "",
	// 				name: randomElement(["Prova", "Apostila", "Livro"]),
	// 				teacher: randomElement(teachers),
	// 				discipline: randomElement(disciplines),
	// 				university: randomElement(universities),
	// 			}));
	// 		});
	// 	} catch {
	// 		runInAction(() => {
	// 			this.didError = true;
	// 			this.files = null;
	// 		});
	// 	} finally {
	// 		runInAction(() => (this.isLoadingSearchResults = false));
	// 	}
	// }

	// @action.bound
	// private async updateCategories() {
	// 	this.universities = [
	// 		{ id: "UFBA", name: "UFBA - Universidade Federal da Bahia" },
	// 		{ id: "UNEB", name: "UNEB - Universidade Estadual da Bahia" },
	// 	];

	// 	this.disciplines = [
	// 		{ id: "1", name: "FIS121 - Física 1" },
	// 		{ id: "2", name: "MAT121 - Cálculo 1" },
	// 		{ id: "3", name: "MAT122 - Cálculo 2" },
	// 		{ id: "4", name: "MAT123 - Cálculo 3" },
	// 	];

	// 	this.teachers = [
	// 		{ id: "1", name: "Marcelo Guedes" },
	// 		{ id: "2", name: "Maurício Pamplona" },
	// 	];
	// }

	// @action.bound
	// public changeQuery(query: string) {
	// 	this.query = query;
	// 	this.search();
	// }

	// @action.bound
	// public selectUniversity(id: string) {
	// 	this.selectedUniversity =
	// 		this.universities.find(el => el.id === id) || null;
	// 	this.search();
	// }

	// @action.bound
	// public selectDiscipline(id: string) {
	// 	this.selectedDiscipline =
	// 		this.disciplines.find(el => el.id === id) || null;
	// 	this.search();
	// }

	// @action.bound
	// public selectTeacher(id: string) {
	// 	this.selectedTeacher = this.teachers.find(el => el.id === id) || null;
	// 	this.search();
	// }

	@action
	public fetch() {
		api.getFiles().then(files => {
			console.log(files);
		});
	}
}