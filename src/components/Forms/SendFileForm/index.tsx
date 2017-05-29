import * as React from "react";
import { Field, reduxForm } from "redux-form";

import Autocomplete from 'react-toolbox/lib/autocomplete';

import states from "../../../vendor/states";
import cities from "../../../vendor/cities";

const s = require("./SendFileForm.scss");

export interface ISendFileFormProps {

}

export interface ISendFileFormState {
    multiple: any;
}

class SendFileForm extends React.Component<ISendFileFormProps, ISendFileFormState> {
    constructor(props: ISendFileFormProps) {
        super(props);

        this.state = {
            multiple: ""
        }
    }

    handleMultipleChange(value: any) {
        this.setState({multiple: value});
    };

    render() {
        return (
            <div className={s.form}>
                <div className={s.formUpload}>
                    Upload
                </div>
                
                <div className={s.formData}>
                    <Autocomplete
                        direction="down"
                        onChange={this.handleMultipleChange}
                        label="Selecione seu estado"
                        source={states}
                        value={this.state.multiple}
                        multiple={false}
                        showSuggestionsWhenValueIsSet={true}
                    />

                    <Autocomplete
                        direction="down"
                        onChange={this.handleMultipleChange}
                        label="Selecione sua cidade"
                        source={cities["BA"]}
                        value={this.state.multiple}
                        multiple={false}
                        showSuggestionsWhenValueIsSet={true}
                    />

                    <Autocomplete
                        direction="down"
                        onChange={this.handleMultipleChange}
                        label="Selecione a universidade"
                        source={cities["BA"]}
                        value={this.state.multiple}
                        multiple={false}
                        showSuggestionsWhenValueIsSet={true}
                    />

                    <Autocomplete
                        direction="down"
                        onChange={this.handleMultipleChange}
                        label="Selecione a discplina"
                        source={cities["BA"]}
                        value={this.state.multiple}
                        multiple={false}
                        showSuggestionsWhenValueIsSet={true}
                    />
                </div>
            </div>
        );
    }
}

export default SendFileForm;
