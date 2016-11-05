import * as React from "react";
const s = require("./SimpleCard.scss");

interface Props {
    name: string;
};

class SimpleCard extends React.Component<Props, {}> {
    render() {
        return (
            <div className={s.card}>
                {this.props.name}
            </div>
        );
    }
}

export default SimpleCard;
