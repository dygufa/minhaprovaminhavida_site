import { combineReducers } from "redux";
import files, { FileState } from "./modules/files/files";

export interface Action<T>{
  type: string;
  payload?: T;
  error?: boolean;
  meta?: any;
}

export interface RootState {
    files: FileState;
}

const reducers = combineReducers({
    files
});

export default reducers;
