import { observable } from "mobx";

export class UiStore {
    @observable public loginDialog: boolean = false;
}