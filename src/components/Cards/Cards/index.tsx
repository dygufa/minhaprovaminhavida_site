import * as React from "react";
import SimpleCard from "../SimpleCard";
const s = require("./Cards.scss");

export interface Props {
    items: any;
}

class Cards extends React.Component<Props, {}> {
    render() {
        let files = this.props.items.map((file: any) => {
            return (
                <SimpleCard
                    key={file.id}
                    name={file.name}
					professor={file.professor}
					course={file.course}
					thumbnail={file.thumbnail}
                />
            );
        });

        return (
            <div className="container">
				<div className={s.cards}>
					{files}
				</div>
            </div>
        );
    }
}

export default Cards;
