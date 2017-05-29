import { Action } from "../../index";

const REQUEST_FILES = "mpmv/files/REQUEST_FILES";
export function requestFiles() {
    return { type: REQUEST_FILES };
}

const RECEIVE_FILES = "mpmv/files/RECEIVE_FILES";
export function receiveFiles(json: Object) {
    return {
        type: RECEIVE_FILES,
        payload: {
            json
        }
    };
}

export function fetchFiles() {
    return (dispatch: any) => {
        dispatch(requestFiles());

        dispatch(receiveFiles([
            {
                id: 1,
                name: "Prova 1",
				professor: "Tito Luis",
				course: "Sinais 2",
				period: "2016.1",
				thumbnail: "http://thecatapi.com/api/images/get?format=src&type=png&size=small",
				likes: 15
            },
            {
                id: 2,
                name: "Arquivo 2"
            },
            {
                id: 3,
                name: "Arquivo 3"
            },
            {   
                id: 4,
                name: "Arquivo 4"
            },
            {
                id: 5,
                name: "Arquivo 5"
            },
            {
                id: 6,
                name: "Arquivo 6"
            },
            {
                id: 7,
                name: "Arquivo 7"
            }
        ]));
    };
}

export interface FileState {
    isFetching: boolean;
    isInvalid: boolean;
    items: any;
};

export interface FilePayload {
    json: any;
}

const INITIAL_STATE: FileState = {
    isFetching: false,
    isInvalid: false,
    items: []
};

export default function reducer(state: FileState = INITIAL_STATE, action: Action<FilePayload>) {
    switch (action.type) {
        case REQUEST_FILES:
            return Object.assign({}, state, {
                isFetching: true,
                isInvalid: false
            });
        case RECEIVE_FILES:
            return Object.assign({}, state, {
                isFetching: false,
                isInvalid: false,
                items: action.payload.json
            });
        default:
            return state;
    }
}
