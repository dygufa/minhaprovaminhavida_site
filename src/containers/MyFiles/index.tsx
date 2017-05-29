import * as React from "react";
import { connect } from "react-redux";
import { RootState, Action } from "../../redux";
import { fetchFiles, FilePayload } from "../../redux/modules/files/files";

import Cards from "../../components/Cards/Cards";

const s = require("./Home.scss");

export interface Props {
    files: any;
    dispatch: any;
}

class MyFiles extends React.Component<Props, {}> {

    componentWillMount() {
        this.props.dispatch(fetchFiles());
    }

    render() {
        return (
			<div className={s.homeContent}>
	            Oi
			</div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        files: state.files.items
    };
};

export default connect(mapStateToProps)(MyFiles);
