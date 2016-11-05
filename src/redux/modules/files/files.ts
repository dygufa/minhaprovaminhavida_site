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
                name: "Arquivo 1"
            },
            {
                name: "Arquivo 2"
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
