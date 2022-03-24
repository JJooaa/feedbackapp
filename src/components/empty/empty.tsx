import React from "react";
import "../../styles/empty.scss";
import emptyIcon from "../../assets/suggestions/illustration-empty.svg";
import AddButton from "../addbutton/addbutton";

const Empty: React.FC = () => {
    return (
        <div className="empty-container">
            <img src={emptyIcon} alt="mysterious man" />
            <div>
                <h1>There is no feedback yet.</h1>
                <p>
                    Got a suggestion? Found a bug that needs to be squashed? We
                    love hearing about new ideas to improve our app.
                </p>
                <AddButton />
            </div>
        </div>
    );
};

export default Empty;
