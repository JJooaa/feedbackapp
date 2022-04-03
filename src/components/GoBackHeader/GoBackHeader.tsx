import React from "react";
import arrowLeft from "../../assets/shared/icon-arrow-left.svg";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

interface Props {
  page: string;
}
const GoBackHeader: React.FC<Props> = ({ page }) => {
  return (
    <header
      className={
        page === "roadmap"
          ? "feedback-header roadmap-header"
          : "feedback-header"
      }
    >
      <div className="roadmap-items">
        <div>
          <img src={arrowLeft} alt="arrow-left" />
          <Link to="/feedbacks">Go Back</Link>
        </div>
        {page === "roadmap" && <h2>Roadmap</h2>}
      </div>
      {page === "detail" && (
        <Button text="Edit Feedback" color="#4661E6" link="feedbacks/edit" />
      )}
      {page === "roadmap" && (
        <Button text="+ Add Feedback" color="#C75AF6" link="feedbacks/create" />
      )}
    </header>
  );
};

export default GoBackHeader;
