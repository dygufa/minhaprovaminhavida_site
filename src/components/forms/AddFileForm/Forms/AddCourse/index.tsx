import * as React from "react";
import { withFormik, FormikProps } from "formik";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export interface IAddCourseFormValue {
    code: string;
    name: string;
}

interface IAddCourseFormProps {
    onSubmit: (v: IAddCourseFormValue) => void;
    goBack: () => void;
    code: string;
    name: string;
}

type Props = IAddCourseFormProps & FormikProps<IAddCourseFormValue>;


class AddCourseForm extends React.Component<Props, {}> {

    public render() {
        const { values, setFieldValue, handleSubmit, touched, errors } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: "20px" }}>
                    Nenhum curso encontrado com esse código. Preencha o formulário abaixo para criar a disciplina ou faça uma nova busca:

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <TextField
                            floatingLabelText="Código da discplina"
                            floatingLabelFixed={true}
                            value={values.code}
                            onChange={(_, value) => setFieldValue("code", value)}
                            errorText={touched.code && errors.code}
                        />

                        <TextField
                            floatingLabelText="Nome da discplina"
                            floatingLabelFixed={true}
                            value={values.name}
                            onChange={(_, value) => setFieldValue("name", value)}
                            errorText={touched.name && errors.name}
                        />
                    </div>

                </div>

                <div style={{ marginTop: "40px" }}>
                    <RaisedButton
                        onClick={this.props.goBack}
                        label="Voltar para busca"
                    />

                    <RaisedButton
                        type="submit"
                        label="Adicionar curso e prosseguir"
                        primary={true}
                        style={{
                            marginLeft: "10px"
                        }}
                    />
                </div>
            </form>
        );
    }
}

export default withFormik<IAddCourseFormProps, IAddCourseFormValue>({
    mapPropsToValues: props => ({ name: props.name, code: props.code }),
    validate: (values, props) => {
        const errors: Partial<{ [key in keyof IAddCourseFormValue]: string}> = {};

        if (values.code === "") {
            errors.code = "Informe o código da disciplina";
        }
        
        if (values.name === "") {
            errors.name = "Informe o nome da disciplina";
        }

        return errors;
    },
    handleSubmit: (value, props) => {
        props.props.onSubmit(value);
    },
})(AddCourseForm);
