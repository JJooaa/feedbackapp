import React from "react";

interface Props {
    text: string;
    color: string;
}

const Button = ({ text, color }: Props) => {
    return (
        <button style={{ backgroundColor: color }} className="feedback-button">
            {text}
        </button>
    );
};

export default Button;
