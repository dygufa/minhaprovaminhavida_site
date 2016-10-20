import { Action } from "../../index";

// Actions
const INCREMENT = "boilerplate/counter/INCREMENT";
const DECREMENT = "boilerplate/counter/DECREMENT";

// Reducer
export interface CounterState {
    value: number;
}

export interface CounterPayload {
}

const INITIAL_STATE = {
    value: 0
};

export default function reducer(state: CounterState = INITIAL_STATE, action: Action<CounterPayload>) {
    switch (action.type) {
        case INCREMENT:
            return Object.assign({}, state, {
                value: state.value + 1
            });
        case DECREMENT:
            return Object.assign({}, state, {
                value: state.value - 1
            });
        default:
            return state;
    }
}

// Action Creators
export function incrementCounter() {
    return { type: INCREMENT };
}

export function decrementCounter() {
    return { type: DECREMENT };
}
