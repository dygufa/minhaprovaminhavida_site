import * as React from "react";
import { connect } from "react-redux";
import { RootState, Action } from "../../redux";
import { fetchFiles, FilePayload } from "../../redux/modules/files/files";

import {Tab, Tabs} from "react-toolbox";
import Cards from "../../components/Cards/Cards";

const s = require("./Me.scss");

export interface IMeProps {
    files: any;
    dispatch: any;
}

export interface IMeState {
    fixedIndex: number;
}

class Me extends React.Component<IMeProps, IMeState> {
    constructor(props: IMeProps) {
        super(props);

        this.state = {
            fixedIndex: 0
        }
    }

    componentWillMount() {
        this.props.dispatch(fetchFiles());
    }

    handleFixedTabChange(index: number) {
        this.setState({fixedIndex: index});
    };

    render() {
        return (
            <Tabs index={this.state.fixedIndex} onChange={this.handleFixedTabChange.bind(this)} fixed>
                <Tab label="Meus arquivos"><small>First Content</small></Tab>
                <Tab label="Favoritos"><small>Second Content</small></Tab>
            </Tabs>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        files: state.files.items
    };
};

export default connect(mapStateToProps)(Me);
