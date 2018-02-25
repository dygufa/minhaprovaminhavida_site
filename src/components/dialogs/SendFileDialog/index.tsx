
import * as React from "react";
import Dialog from "material-ui/Dialog";
// import RaisedButton from "material-ui/RaisedButton";
// import FontIcon from "material-ui/FontIcon";

interface ISendFileDialogProps {
    open: boolean;
    onClose: () => void;
}

class SendFileDialog extends React.Component<ISendFileDialogProps, {}> {
	public render() {
		return (
            <Dialog
                title="Enviar Arquivo"
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onClose}
            >
                Oi
            </Dialog> 
		);
	}
}

export default SendFileDialog;
