import { FilesStore, UniversitiesStore, AuthStore, UiStore } from "./";

export class RootStore {
    public filesStore: FilesStore;
    public universitiesStore: UniversitiesStore;
    public authStore: AuthStore;
    public uiStore: UiStore;

    constructor() {
        this.filesStore = new FilesStore(this);
        this.authStore = new AuthStore(this);
        this.uiStore = new UiStore(this);
        this.universitiesStore = new UniversitiesStore(this);
    }

    public export() {
        return {
            filesStore: this.filesStore,
            authStore: this.authStore,
            uiStore: this.uiStore,
            universitiesStore: this.universitiesStore
        }
    }

}