
import * as React from "react";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

interface ILoginDialogProps {
    open: boolean;
    onClose: () => void;
    responseGoogle: (res: any) => void;
    responseFacebook: (res: any) => void;
}

class LoginDialog extends React.Component<ILoginDialogProps, {}> {
	public render() {
		return (
            <Dialog
                title="Fazer login"
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onClose}
            >
                Escolha uma das opções abaixo para fazer login: <br />

                <GoogleLogin
                    clientId="656387297871-3naai0hp1kni6ehhr8tk5htc8j9bg7dj.apps.googleusercontent.com"
                    onSuccess={this.props.responseGoogle}
                    onFailure={this.props.responseGoogle}
                    tag="div"
                    style={{}}
                >
                    <RaisedButton
                        label="Login Google"
                        primary={true}
                        icon={<FontIcon className="fa fa-google" />}
                    />
                </GoogleLogin>

                <FacebookLogin
                    appId="1599405403704130"
                    fields="name,email,picture"
                    autoLoad={false}
                    callback={this.props.responseFacebook}
                >
                    <RaisedButton
                        label="Login Facebok"
                        primary={true}
                        icon={<FontIcon className="fa fa-facebook" />}
                    />
                </FacebookLogin>

            </Dialog> 
		);
	}
}

export default LoginDialog;
