import * as React from "react";
import { observer, inject } from "mobx-react";
import { FilesStore } from "../../stores/";
import CircularProgress from "material-ui/CircularProgress";
import File from "../../components/File/";

interface IFileListProps {
    filesStore?: FilesStore;
}

interface IFileListState { }

@inject("filesStore")
@observer
class FileList extends React.Component<IFileListProps, IFileListState> {
    public render() {
        if (this.props.filesStore!.isLoadingSearchResults) {
            return <CircularProgress />;
        }

        if (this.props.filesStore!.files.length === 0) {
            return <div>Nenhum arquivo encontrado :(</div>;
        }

        return (
            this.props.filesStore!.files!.map(file => (
                <File
                    file={file}
                />
            ))
        );
    }
}

export default FileList;
