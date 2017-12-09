import {
	autocompleteOfType,
	DataSourceConfig,
} from "../../helpers/TypedAutosuggest";
import {
	FilesStore,
	IUniversity,
	IDiscipline,
	ITeacher,
} from "../../models/files";
import s from "./style.scss";
import * as React from "react";
import { action, observable, toJS } from "mobx";
import { observer, inject } from "mobx-react";
import {
	Toolbar,
	ToolbarGroup,
	TextField,
	AutoComplete,
	ToolbarTitle,
	IconButton,
	CircularProgress,
	Card,
	CardHeader,
	CardText,
	ListItem,
	Subheader,
} from "material-ui";
import { ContentFilterList } from "material-ui/svg-icons";
import * as classnames from "classnames";
import MediaQuery from "react-responsive";

const UniversityAutoComplete = autocompleteOfType<IUniversity>();
const universityDataSourceConfig: DataSourceConfig<IUniversity> = {
	text: "name",
	value: "id",
};

const DisciplineAutoComplete = autocompleteOfType<IDiscipline>();
const disciplineDataSourceConfig: DataSourceConfig<IDiscipline> = {
	text: "name",
	value: "id",
};

const TeacherAutoComplete = autocompleteOfType<ITeacher>();
const teacherDataSourceConfig: DataSourceConfig<ITeacher> = {
	text: "name",
	value: "id",
};

interface IMainProps {
	filesStore?: FilesStore;
}

interface IMainState {}

const widthBreakpoint = 1100;

@inject("filesStore")
@observer
export default class Main extends React.Component<IMainProps, IMainState> {
	private changeQuery = (_: any, value: string) => {
		this.props.filesStore!.changeQuery(value);
	};

	@observable private isFilterOpen = false;

	@action.bound
	private toggleFilter() {
		this.isFilterOpen = !this.isFilterOpen;
	}

	private UniversityField = () => {
		const selected = this.props.filesStore!.selectedUniversity;
		const value = (selected && selected.id) || undefined;

		return (
			<UniversityAutoComplete
				openOnFocus
				dataSource={toJS(this.props.filesStore!.universities)}
				dataSourceConfig={universityDataSourceConfig}
				filter={AutoComplete.fuzzyFilter}
				hintText="Universidade"
				value={value}
				onChange={(_, value) =>
					this.props.filesStore!.selectUniversity(value)
				}
			/>
		);
	};

	private DisciplineField = () => {
		const selected = this.props.filesStore!.selectedUniversity;
		const value = (selected && selected.id) || undefined;

		return (
			<DisciplineAutoComplete
				openOnFocus
				dataSource={toJS(this.props.filesStore!.disciplines)}
				dataSourceConfig={disciplineDataSourceConfig}
				filter={AutoComplete.fuzzyFilter}
				hintText="Disciplina"
				value={value}
				onChange={(_, value) =>
					this.props.filesStore!.selectDiscipline(value)
				}
			/>
		);
	};

	private TeacherField = () => {
		const selected = this.props.filesStore!.selectedUniversity;
		const value = (selected && selected.id) || undefined;

		return (
			<TeacherAutoComplete
				openOnFocus
				dataSource={toJS(this.props.filesStore!.teachers)}
				dataSourceConfig={teacherDataSourceConfig}
				filter={AutoComplete.fuzzyFilter}
				hintText="Professor(a)"
				value={value}
				onChange={(_, value) =>
					this.props.filesStore!.selectTeacher(value)
				}
			/>
		);
	};

	public render() {
		const { query } = this.props.filesStore!;
		const { TeacherField, DisciplineField, UniversityField } = this;

		return (
			<div className={s.container}>
				<MediaQuery minWidth={widthBreakpoint}>
					{matches => (
						<Toolbar
							className={classnames(
								!matches && s.mobile,
								this.isFilterOpen && s.open,
							)}
						>
							<ToolbarGroup
								style={matches ? undefined : { width: "100%" }}
							>
								<ToolbarTitle text="Busca" />

								{!matches ? (
									<IconButton onClick={this.toggleFilter}>
										<ContentFilterList />
									</IconButton>
								) : null}
							</ToolbarGroup>

							{matches || this.isFilterOpen ? (
								<React.Fragment>
									<ToolbarGroup>
										<TextField
											hintText="Pesquisar por material"
											onChange={this.changeQuery}
											value={query}
										/>
									</ToolbarGroup>

									<ToolbarGroup>
										<UniversityField />
									</ToolbarGroup>

									<ToolbarGroup>
										<DisciplineField />
									</ToolbarGroup>

									<ToolbarGroup>
										<TeacherField />
									</ToolbarGroup>
								</React.Fragment>
							) : null}
						</Toolbar>
					)}
				</MediaQuery>

				<div className={s.results}>
					{this.props.filesStore!.isLoadingSearchResults ? (
						<CircularProgress />
					) : this.props.filesStore!.didError ? (
						<div>EITA</div>
					) : this.props.filesStore!.files ? (
						this.props.filesStore!.files!.map(file => (
							<Card>
								<CardHeader title={file.name} />
								<CardText>
									<Subheader>Universidade</Subheader>
									<div>{file.university.name}</div>

									<Subheader>Disciplina</Subheader>
									<div>{file.discipline.name}</div>

									<Subheader>Professor</Subheader>
									<div>{file.teacher.name}</div>
								</CardText>
							</Card>
						))
					) : (
						<div>Ainda não filtrou</div>
					)}
				</div>
			</div>
		);
	}
}
