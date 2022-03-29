import React from "react";
import arrowLeft from "../../assets/shared/icon-arrow-left.svg";
import { Link } from "react-router-dom";

const GoBackHeader = () => {
    return (
        <header className="feedback-header">
            <div className="go-back">
                <img src={arrowLeft} alt="arrow-left" />
                <Link className="detail-back" to="/feedbacks">
                    Go Back
                </Link>
            </div>
        </header>
    );
};

export default GoBackHeader;
