import * as React from "react";
import { withFormik, FormikProps } from "formik";

interface ILoginFormValue {
	email: string;
	password: string;
}

interface ILoginFormProps {
	onSubmit: (v: ILoginFormValue) => void;
}

type Props = ILoginFormProps & FormikProps<ILoginFormValue>;

class LoginForm extends React.Component<Props, {}> {
	public render() {
		return (
			<form onSubmit={this.props.handleSubmit}>
				<div>
					<input
						required
						type="email"
						name="email"
						value={this.props.values.email}
						onChange={this.props.handleChange}
					/>
				</div>

				<div>
					<input
						required
						type="password"
						name="password"
						value={this.props.values.password}
						onChange={this.props.handleChange}
					/>
				</div>

				<button>Fazer login</button>
			</form>
		);
	}
}

export default withFormik<ILoginFormProps, ILoginFormValue>({
	handleSubmit(value, props) {
		props.props.onSubmit(value);
	},
})(LoginForm);
