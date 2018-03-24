import * as React from "react";
import { withFormik, FormikProps } from "formik";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { BasicUniversity } from "../../../vendor/api";

interface IAddFileFormValue {
	universityId: string;
}

interface IAddFileFormProps {
	onSubmit: (v: IAddFileFormValue) => void;
	universities: BasicUniversity[];
}

type Props = IAddFileFormProps & FormikProps<IAddFileFormValue>;

class AddFileForm extends React.Component<Props, {}> {
	public render() {
		const { universities, values, setFieldValue } = this.props;

		return (
			<form onSubmit={this.props.handleSubmit}>
				<div>
					<TextField
						floatingLabelText="Nome do arquivo"
					/>
				</div>

				<div>
					<SelectField
						floatingLabelText="Universidade"
						value={values.universityId}
						onChange={(event, index, value) => setFieldValue("universityId", value)}
					>
						{universities.map(university => 
							<MenuItem key={university.id} value={university.id} primaryText={university.name} />
						)}
					</SelectField>
				</div>
				
				<RaisedButton label="Enviar arquivo" primary={true} />
			</form>
		);
	}
}

export default withFormik<IAddFileFormProps, IAddFileFormValue>({
	handleSubmit(value, props) {
		props.props.onSubmit(value);
	},
})(AddFileForm);
