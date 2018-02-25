import * as React from "react";
import { observer, inject } from "mobx-react";
import Card from "material-ui/Card";
import CardHeader from "material-ui/Card/CardHeader";
import CardText from "material-ui/Card/CardHeader";
import Subheader from "material-ui/Subheader";
import * as api from "../../vendor/api";

interface IFileProps {
    file: api.File;
}

interface IFileState {}

@inject()
@observer
class File extends React.Component<IFileProps, IFileState> {
    public render() {
        const file = this.props.file;

        return (
            <Card>
                <CardHeader title={file.name} />
                <CardText>
                    <Subheader>Universidade</Subheader>
                    <div>{file.university.name}</div>

                    <Subheader>Disciplina</Subheader>
                    <div>{file.course.name}</div>

                    <Subheader>Professor</Subheader>
                    <div>Professor</div>
                </CardText>
            </Card>
        );
    }
}

export default File;
