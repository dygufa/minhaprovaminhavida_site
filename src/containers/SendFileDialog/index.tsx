
import * as React from "react";
import { observer, inject } from "mobx-react";
import Dialog from "material-ui/Dialog";
import AddFileForm from "../../components/forms/AddFileForm/";
import { UniversitiesStore, CoursesStore } from "../../stores/";

interface ISendFileDialogProps {
    open: boolean;
    onClose: () => void;
    universitiesStore?: UniversitiesStore;
    coursesStore?: CoursesStore;
}

@inject("universitiesStore", "coursesStore")
@observer
class SendFileDialog extends React.Component<ISendFileDialogProps, {}> {
    public componentWillMount() {
        this.props.universitiesStore!.fetch();
    }

	public render() {
		return (
            <Dialog
                title="Enviar Arquivo"
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onClose}
            >
                <AddFileForm
                    onSubmit={() => {
                        
                    }}
                    universities={this.props.universitiesStore!.universities}
                    onSearchCourse={this.props.coursesStore!.getByCode}
                />
            </Dialog> 
		);
	}
}

export default SendFileDialog;
