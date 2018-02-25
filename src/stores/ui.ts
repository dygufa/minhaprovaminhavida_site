import { observable } from "mobx";
import { RootStore } from "./";

export class UiStore {
    protected rootStore: RootStore;
    @observable public addFileDialog: boolean = false;
    @observable public loginDialog: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

}