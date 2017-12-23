import { FilesStore, AuthStore, UiStore } from "./";

export class RootStore {
    private fileStore: FilesStore;
    private authStore: AuthStore;

    constructor() {
        this.fileStore = new FilesStore(this);
        this.authStore = new AuthStore(this);
    }

    public export() {
        return {
            fileStore: this.fileStore,
            authStore: this.authStore
        }
    }

}