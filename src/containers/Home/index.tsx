import * as React from "react";
import { connect } from "react-redux";
import { RootState, Action } from "../../redux";
import { incrementCounter, decrementCounter, CounterPayload } from "../../redux/modules/counter/counter";

import CounterButton from "../../components/Buttons/CounterButton/CounterButton";

export interface Props {
    value: number;
    dispatch: (action: Action<CounterPayload>) => any;
}

class Home extends React.Component<Props, {}> {

    onIncrement() {
        this.props.dispatch(incrementCounter());
    }

    onDecrement() {
        this.props.dispatch(decrementCounter());
    }

    render() {
        return (
            <div>
                <h1>Contador: {this.props.value}</h1>
                <CounterButton onClick={this.onIncrement.bind(this)}>Incrementar</CounterButton>
                <CounterButton onClick={this.onDecrement.bind(this)}>Decrementar</CounterButton>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        value: state.counter.value
    };
};

export default connect(mapStateToProps)(Home);
