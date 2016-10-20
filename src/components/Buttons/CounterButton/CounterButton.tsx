import * as React from "react";

export interface Props {
    onClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
    children?: string;
};

const CounterButton = ({ onClick, children }: Props) => {
    return (
        <button
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default CounterButton;
