import * as React from "react";
import { PageHeader } from "react-bootstrap";

export interface Props {
}

class App extends React.Component<Props, {}> {
    render() {
        return (
            <PageHeader>Minha prova minha vida</PageHeader>
        );
    }
}

export default App;
