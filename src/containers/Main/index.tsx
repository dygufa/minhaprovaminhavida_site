// import {
// 	autocompleteOfType,
// 	DataSourceConfig,
// } from "../../helpers/TypedAutosuggest";
import {
	FilesStore,
	// IUniversity,
	// IDiscipline,
	// ITeacher,
} from "../../stores/files";
// import s from "./style.scss";
import * as React from "react";
// import { action, observable } from "mobx";
import { observer, inject } from "mobx-react";
import {
	// Toolbar,
	// ToolbarGroup,
	// TextField,
	// AutoComplete,
	// ToolbarTitle,
	// IconButton,
	// CircularProgress,
	// Card,
	// CardHeader,
	// CardText,
	// Subheader,
} from "material-ui";
// import { ContentFilterList } from "material-ui/svg-icons";
// import * as classnames from "classnames";
// import MediaQuery from "react-responsive";
import Files from "../Files/";

// const UniversityAutoComplete = autocompleteOfType<IUniversity>();
// const universityDataSourceConfig: DataSourceConfig<IUniversity> = {
// 	text: "name",
// 	value: "id",
// };

// const DisciplineAutoComplete = autocompleteOfType<IDiscipline>();
// const disciplineDataSourceConfig: DataSourceConfig<IDiscipline> = {
// 	text: "name",
// 	value: "id",
// };

// const TeacherAutoComplete = autocompleteOfType<ITeacher>();
// const teacherDataSourceConfig: DataSourceConfig<ITeacher> = {
// 	text: "name",
// 	value: "id",
// };

interface IMainProps {
	filesStore?: FilesStore;
}

interface IMainState { }

// const widthBreakpoint = 1100;

@inject("filesStore")
@observer
export default class Main extends React.Component<IMainProps, IMainState> {
	// private changeQuery = (_: any, value: string) => {
	// 	this.props.filesStore!.changeQuery(value);
	// };

	// @observable private isFilterOpen = false;

	// @action.bound
	// private toggleFilter() {
	// 	this.isFilterOpen = !this.isFilterOpen;
	// }

	// private UniversityField = () => {
	// 	const selected = this.props.filesStore!.selectedUniversity;
	// 	const value = (selected && selected.id) || undefined;

	// 	return (
	// 		<UniversityAutoComplete
	// 			openOnFocus
	// 			dataSource={toJS(this.props.filesStore!.universities)}
	// 			dataSourceConfig={universityDataSourceConfig}
	// 			filter={AutoComplete.fuzzyFilter}
	// 			hintText="Universidade"
	// 			value={value}
	// 			onChange={(_: any, value: any) =>
	// 				this.props.filesStore!.selectUniversity(value)
	// 			}
	// 		/>
	// 	);
	// };

	// private DisciplineField = () => {
	// 	const selected = this.props.filesStore!.selectedUniversity;
	// 	const value = (selected && selected.id) || undefined;

	// 	return (
	// 		<DisciplineAutoComplete
	// 			openOnFocus
	// 			dataSource={toJS(this.props.filesStore!.disciplines)}
	// 			dataSourceConfig={disciplineDataSourceConfig}
	// 			filter={AutoComplete.fuzzyFilter}
	// 			hintText="Disciplina"
	// 			value={value}
	// 			onChange={(_: any, value: any) =>
	// 				this.props.filesStore!.selectDiscipline(value)
	// 			}
	// 		/>
	// 	);
	// };

	// private TeacherField = () => {
	// 	const selected = this.props.filesStore!.selectedUniversity;
	// 	const value = (selected && selected.id) || undefined;

	// 	return (
	// 		<TeacherAutoComplete
	// 			openOnFocus
	// 			dataSource={toJS(this.props.filesStore!.teachers)}
	// 			dataSourceConfig={teacherDataSourceConfig}
	// 			filter={AutoComplete.fuzzyFilter}
	// 			hintText="Professor(a)"
	// 			value={value}
	// 			onChange={(_: any, value: any) =>
	// 				this.props.filesStore!.selectTeacher(value)
	// 			}
	// 		/>
	// 	);
	// };

	public render() {
		return <Files/>;
	}
}
