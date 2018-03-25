import * as React from "react";
import { BasicUniversity } from "../../../../../vendor/api";
import { withFormik, FormikProps } from "formik";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

export interface IBasicInfoFormValue {
    name: string;
    universityId: string;
}

interface IBasicInfoFormProps {
    onSubmit: (v: IBasicInfoFormValue) => void;
    universities: BasicUniversity[];
    fileName: string;
    universityId: string;
}

type Props = IBasicInfoFormProps & FormikProps<IBasicInfoFormValue>;


class BasicInfoForm extends React.Component<Props, {}> {

    public render() {
        const { universities, values, setFieldValue, handleSubmit, touched, errors } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        floatingLabelText="Nome do arquivo"
                        floatingLabelFixed={true}
                        errorText={touched.name && errors.name}
                        value={values.name}
                        onChange={(_, value) => setFieldValue("name", value)}
                    />
                </div>

                <div>
                    <SelectField
                        floatingLabelText="Universidade"
                        value={values.universityId}
                        floatingLabelFixed={true}
                        onChange={(event, index, value) => setFieldValue("universityId", value)}
                        errorText={touched.universityId && errors.universityId}
                    >
                        {universities.map(university =>
                            <MenuItem key={university.id} value={university.id} primaryText={university.name} />
                        )}
                    </SelectField>
                </div>

                <div>
                    <RaisedButton
                        label="Próximo"
                        primary={true}
                        type="submit"
                    />
                </div>
            </form>
        );
    }
}

export default withFormik<IBasicInfoFormProps, IBasicInfoFormValue>({
    mapPropsToValues: props => ({ name: props.fileName, universityId: props.universityId }),
    validate: (values, props) => {
        const errors: Partial<{ [key in keyof IBasicInfoFormValue]: string}> = {};

        if (values.name === "") {
            errors.name = "Informe um nome para o arquivo";
        }

        if (values.universityId === "") {
            errors.universityId = "Selecione uma universidade";
        }

        return errors;
    },
    handleSubmit: (value, props) => {
        props.props.onSubmit(value);
    },
})(BasicInfoForm);
