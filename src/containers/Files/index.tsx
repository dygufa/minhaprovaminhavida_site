import * as React from "react";
import { observer, inject } from "mobx-react";
import { FilesStore } from "../../stores/";
import { ContentFilterList } from "material-ui/svg-icons";
import * as classnames from "classnames";
import MediaQuery from "react-responsive";
import { action, observable } from "mobx";
import s from "./style.scss";
import FileList from "../FileList/";

import {
    Toolbar,
    ToolbarGroup,
    // TextField,
    // AutoComplete,
    ToolbarTitle,
    IconButton,
    // CircularProgress,
    // Card,
    // CardHeader,
    // CardText,
    // Subheader,
} from "material-ui";

interface IFilesProps {
    filesStore?: FilesStore;
}

interface IFilesState {}

const widthBreakpoint = 1100;

@inject("filesStore")
@observer
class Files extends React.Component<IFilesProps, IFilesState> {
    @observable private isFilterOpen = false;

    @action.bound
    private toggleFilter() {
        this.isFilterOpen = !this.isFilterOpen;
    }

    public componentDidMount() {
        this.props.filesStore!.fetch();
    }

    public render() {
        return (
            <div className={s.container}>
                <MediaQuery minWidth={widthBreakpoint}>
                    {matches => (
                        <Toolbar
                            className={classnames(
                                !matches && s.mobile,
                                this.isFilterOpen && s.open,
                            )}
                        >
                            <ToolbarGroup
                                style={matches ? undefined : { width: "100%" }}
                            >
                                <ToolbarTitle text="Busca" />

                                {!matches ? (
                                    <IconButton onClick={this.toggleFilter}>
                                        <ContentFilterList />
                                    </IconButton>
                                ) : null}
                            </ToolbarGroup>

                            {/* {matches || this.isFilterOpen ? (
								<React.Fragment>
									<ToolbarGroup>
										<TextField
											hintText="Pesquisar por material"
											onChange={this.changeQuery}
											value={query}
										/>
									</ToolbarGroup>

									<ToolbarGroup>
										<UniversityField />
									</ToolbarGroup>

									<ToolbarGroup>
										<DisciplineField />
									</ToolbarGroup>

									<ToolbarGroup>
										<TeacherField />
									</ToolbarGroup>
								</React.Fragment>
							) : null} */}
                        </Toolbar>
                    )}
                </MediaQuery>

                <FileList/>
            </div>
        );
    }
}

export default Files;
