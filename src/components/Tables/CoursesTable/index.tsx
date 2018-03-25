import * as React from "react";
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from "material-ui/Table";
import { Course } from "../../../vendor/api";

interface Props {
    courses: Course[];
}


export default class CoursesTable extends React.Component<Props, {}> {
    public render() {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Código</TableHeaderColumn>
                        <TableHeaderColumn>Nome</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.props.courses.map(course => (
                        <TableRow key={`course-${course.id}`}>
                            <TableRowColumn>{course.code}</TableRowColumn>
                            <TableRowColumn>{course.name}</TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}
