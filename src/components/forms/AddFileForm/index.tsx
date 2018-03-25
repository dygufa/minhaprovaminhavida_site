import * as React from "react";
import { Course, ApiResponse, BasicUniversity } from "../../../vendor/api";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";
import { Stepper, Step, StepLabel } from "material-ui/Stepper";

import CoursesTable from "../../Tables/CoursesTable";
import BasicInfoForm, { IBasicInfoFormValue } from "./Forms/BasicInfo";
import SearchCourseForm, { ISearchCourseFormValue } from "./Forms/SearchCourse";
import AddCourseForm, { IAddCourseFormValue } from "./Forms/AddCourse";

const s = require("./style.scss");

interface IAddFileFormValue {
	universityId: string;
}

interface IAddFileFormProps {
	onSubmit: (v: IAddFileFormValue) => void;
	onSearchCourse: (code: string) => Promise<ApiResponse<Course[]>>;
	universities: BasicUniversity[];
}

interface IAddFileFormState {
	step: number;
	courseStep: number;
	searchCourseCode: string;
	searchingCourse: boolean;
	searchResult: Course[] | null;
	fileName: string;
	universityId: string;
	courseCode: string;
	courseName: string;
}

export default class AddFileForm extends React.Component<IAddFileFormProps, IAddFileFormState> {
	public state: IAddFileFormState = {
		step: 0,
		courseStep: 0,
		searchCourseCode: "",
		searchingCourse: false,
		searchResult: null,
		fileName: "",
		universityId: "",
		courseCode: "",
		courseName: "",
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

	private onAddCourseSubmit = (values: IAddCourseFormValue) => {
		this.setState({
			courseCode: values.code,
			courseName: values.name,
			step: 2
		});
	}

	private courseContent() {
		switch (this.state.courseStep) {
			case 0:
				return this.searchCourse();
			case 1:
				return (
					<AddCourseForm
						onSubmit={this.onAddCourseSubmit}
						goBack={() => this.goToCourseStep(0)}
						name={this.state.courseName}
						code={this.state.courseCode}
					/>
				);
		}	
	}

	private onSearchCourseFormSubmit = (values: ISearchCourseFormValue) => {
		this.setState({
			searchingCourse: true
		});

		this.props.onSearchCourse(values.courseCode).then(courses => {
			this.setState({
				searchingCourse: false,
				searchResult: courses.data,
				courseStep: courses.data.length === 0 ? 1 : 0
			});
		});
	}

	private searchCourse() {
		return (
			<>
				<SearchCourseForm
					onSubmit={this.onSearchCourseFormSubmit}
					courseCode={this.state.searchCourseCode}
				/>

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

	private onBasicInfoSubmit = (values: IBasicInfoFormValue) => {
		this.setState({
			fileName: values.name,
			universityId: values.universityId,
			step: 1
		});
	}

	private content() {
		switch(this.state.step) {
			case 0:
				return (
					<BasicInfoForm
						onSubmit={this.onBasicInfoSubmit}
						universities={this.props.universities}
						fileName={this.state.fileName}
						universityId={this.state.universityId}
					/>
				);
			case 1:
				return this.courseContent();
		}	
	}


	public render() {
		return (
			<>
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
			</>
		);
	}
}
