import * as React from "react";
import { withFormik, FormikProps } from "formik";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export interface ISearchCourseFormValue {
    courseCode: string;
}

interface ISearchCourseFormProps {
    onSubmit: (v: ISearchCourseFormValue) => void;
    courseCode: string;
}

type Props = ISearchCourseFormProps & FormikProps<ISearchCourseFormValue>;


class SearchCourseForm extends React.Component<Props, {}> {

    public render() {
        const { values, setFieldValue, handleSubmit, touched, errors } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div style={{ display: "flex" }}>
                    <TextField
                        floatingLabelText="Código da disciplina"
                        floatingLabelFixed={true}
                        value={values.courseCode}
                        onChange={(event, value) => setFieldValue("courseCode", value)}
                        style={{ flex: 1 }}
                        errorText={touched.courseCode && errors.courseCode}
                    />

                    <RaisedButton
                        label="Buscar"
                        primary={true}
                        type="submit"
                        style={{
                            marginLeft: "20px",
                            alignSelf: "flex-end"
                        }}
                    />
                </div>
            </form>
        );
    }
}

export default withFormik<ISearchCourseFormProps, ISearchCourseFormValue>({
    mapPropsToValues: props => ({ courseCode: props.courseCode }),
    validate: (values, props) => {
        const errors: Partial<{ [key in keyof ISearchCourseFormValue]: string}> = {};

        if (values.courseCode === "") {
            errors.courseCode = "Informe um código de discplina";
        }

        return errors;
    },
    handleSubmit: (value, props) => {
        props.props.onSubmit(value);
    },
})(SearchCourseForm);
