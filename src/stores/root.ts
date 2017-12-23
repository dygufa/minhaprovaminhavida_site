import { FilesStore, AuthStore, UiStore } from "./";

export class RootStore {
    private filesStore: FilesStore;
    private authStore: AuthStore;
    private uiStore: UiStore;

    constructor() {
        this.filesStore = new FilesStore(this);
        this.authStore = new AuthStore(this);
        this.uiStore = new UiStore(this);
    }

    public export() {
        return {
            filesStore: this.filesStore,
            authStore: this.authStore,
            uiStore: this.uiStore
        }
    }

}