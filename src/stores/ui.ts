import { observable } from "mobx";
import { RootStore } from "./";

export class UiStore {
    protected rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable public loginDialog: boolean = false;
}