import { combineReducers } from "redux";
import counter, { CounterState } from "./modules/counter/counter";

export interface Action<T>{
  type: string;
  payload?: T;
  error?: boolean;
  meta?: any;
}

export interface RootState {
    counter: CounterState;
}

const reducers = combineReducers({
    counter
});

export default reducers;
