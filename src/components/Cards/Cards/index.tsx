import * as React from "react";
import SimpleCard from "../SimpleCard";

export interface Props {
    items: any;
}

class Cards extends React.Component<Props, {}> {
    render() {
        let files = this.props.items.map((file: any) => {
            return (
                <SimpleCard
                    name={file.name}
                />
            );
        });

        return (
            <div>
                {files}
            </div>
        );
    }
}

export default Cards;
