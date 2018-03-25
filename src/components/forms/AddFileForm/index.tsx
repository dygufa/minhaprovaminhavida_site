import * as React from "react";
import { Course, ApiResponse, BasicUniversity } from "../../../vendor/api";
import { withFormik, FormikProps } from "formik";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";
import { Stepper, Step, StepLabel } from "material-ui/Stepper";

import CoursesTable from "../../Tables/CoursesTable";

const s = require("./style.scss");

interface IAddFileFormValue {
	universityId: string;
}

interface IAddFileFormProps {
	onSubmit: (v: IAddFileFormValue) => void;
	onSearchCourse: (code: string) => Promise<ApiResponse<Course[]>>;
	universities: BasicUniversity[];
}

type Props = IAddFileFormProps & FormikProps<IAddFileFormValue>;

interface IAddFileFormState {
	step: number;
	courseStep: number;
	courseCode: string;
	searchingCourse: boolean;
	searchResult: Course[] | null;
}

class AddFileForm extends React.Component<Props, IAddFileFormState> {
	public state: IAddFileFormState = {
		step: 1,
		courseStep: 0,
		courseCode: "",
		searchingCourse: false,
		searchResult: null
	}

	private goToStep(step: number) {
		this.setState({
			step
		});	
	}

	private goToCourseStep(courseStep: number) {
		this.setState({
			courseStep
		});
	}

	private basicInfo() {
		const { universities, values, setFieldValue } = this.props;
	
		return (
			<>
				<div>
					<TextField
						floatingLabelText="Nome do arquivo"
						floatingLabelFixed={true}
					/>
				</div>

				<div>
					<SelectField
						floatingLabelText="Universidade"
						value={values.universityId}
						floatingLabelFixed={true}
						onChange={(event, index, value) => setFieldValue("universityId", value)}
					>
						{universities.map(university =>
							<MenuItem key={university.id} value={university.id} primaryText={university.name} />
						)}
					</SelectField>
				</div>

				<div className={s.actionButtons}>
					<RaisedButton
						onClick={() => this.goToStep(1)} 
						label="Próximo" 
						primary={true} 
					/>
				</div>
			</>
		);		
	}

	private onSearchCourse = () => {
		this.setState({
			searchingCourse: true
		});

		const { courseCode } = this.state;

		this.props.onSearchCourse(courseCode).then(courses => {
			this.setState({
				searchingCourse: false,
				searchResult: courses.data,
				courseStep: courses.data.length === 0 ? 1 : 0
			});
		});
	}

	private courseContent() {
		switch (this.state.courseStep) {
			case 0:
				return this.searchCourse();
			case 1:
				return this.addCourse();
		}	
	}

	private searchCourse() {
		return (
			<>
				<div style={{ display: "flex" }}>
					<TextField
						floatingLabelText="Código da disciplina"
						floatingLabelFixed={true}
						value={this.state.courseCode}
						onChange={(event, value) => this.setState({ courseCode: value })}
						style={{ flex: 1 }}
					/>

					<RaisedButton
						label="Buscar"
						primary={true}
						onClick={this.onSearchCourse}
						style={{
							marginLeft: "20px",
							alignSelf: "flex-end"
						}}
					/>
				</div>

				{this.state.searchingCourse && (
					<div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
						<CircularProgress size={50} thickness={3} />
					</div>
				)}

				{this.state.searchResult && this.state.searchResult.length > 0 && <CoursesTable courses={this.state.searchResult} />}

				<div className={s.actionButtons} style={{ marginTop: "40px" }}>
					<RaisedButton
						onClick={() => this.goToStep(0)}
						label="Voltar"
					/>

					<RaisedButton
						onClick={() => this.goToStep(2)}
						label="Próximo"
						primary={true}
						style={{
							marginLeft: "10px"
						}}
					/>
				</div>
			</>
		);
	}

	private addCourse() {
		return (
			<>
				<div style={{ marginTop: "20px"}}>
					Nenhum curso encontrado com esse código. Preencha o formulário abaixo para criar a disciplina ou faça uma nova busca:

					<div style={{ display: "flex", justifyContent: "space-between"}}>
						<TextField
							floatingLabelText="Código da discplina"
							floatingLabelFixed={true}
						/>

						<TextField
							floatingLabelText="Nome da discplina"
							floatingLabelFixed={true}
						/>
					</div>
					
				</div>				

				<div className={s.actionButtons} style={{ marginTop: "40px"}}>
					<RaisedButton 
						onClick={() => this.goToCourseStep(0)} 
						label="Voltar para busca" 
					/>

					<RaisedButton 
						onClick={() => this.goToStep(2)} 
						label="Adicionar curso e prosseguir" 
						primary={true} 
						style={{
							marginLeft: "10px"
						}}
					/>
				</div>
			</>
		);
	}

	private content() {
		switch(this.state.step) {
			case 0:
				return this.basicInfo();
			case 1:
				return this.courseContent();
		}	
	}


	public render() {
		// const { universities, values, setFieldValue } = this.props;

		return (
			<form onSubmit={this.props.handleSubmit}>
				<Stepper activeStep={this.state.step}>
					<Step>
						<StepLabel>Informações básicas</StepLabel>
					</Step>
					<Step>
						<StepLabel>Disciplina</StepLabel>
					</Step>
					<Step>
						<StepLabel>Arquivo</StepLabel>
					</Step>
				</Stepper>

				{this.content()}				
			</form>
		);
	}
}

export default withFormik<IAddFileFormProps, IAddFileFormValue>({
	handleSubmit(value, props) {
		props.props.onSubmit(value);
	},
})(AddFileForm);
