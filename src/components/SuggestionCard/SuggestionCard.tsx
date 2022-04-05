import React from "react";
import "./suggestioncard.scss";
import upArrow from "../../assets/shared/icon-arrow-up.svg";
import commentsIcon from "../../assets/shared/icon-comments.svg";
import { Link } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
interface Props {
  item: {
    title: string;
    description: string;
    category: string;
    upvotes: number;
    comments: object[];
    status: string;
    id: number;
  };
}

const SuggestionCard: React.FC<Props> = ({ item }) => {
  const { width } = useWindowSize();
  const returnCommentsLength = (commentsArray: object[]): number => {
    return commentsArray === undefined ? 0 : commentsArray.length;
  };

  const firstLetterToUpperCase = (data: string): string => {
    let array = data.split("");
    let firstLetter = array[0].toUpperCase();
    return [firstLetter, ...array.slice(1, array.length)].join("");
  };

  const renderMobileVersion = () => {
    return (
      <div className="data">
        <div className="info-container bubble category">
          <img alt="arrow pointing up" src={upArrow} />
          <span>{item.upvotes}</span>
        </div>
        <div className="info-container">
          <img src={commentsIcon} alt="chat bubble" />
          <span>{returnCommentsLength(item.comments)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="feedbackcard">
      <div className="info-texts">
        <Link to={`/feedbacks/${item.id}`}>{item.title}</Link>
        <p>{item.description}</p>
        <div className="bubble">
          <h2>{firstLetterToUpperCase(item.category)}</h2>
        </div>
      </div>

      {width < 700 ? (
        renderMobileVersion()
      ) : (
        // desktop version
        <>
          <div className="info-container bubble order1">
            <img alt="arrow pointing up" src={upArrow} />
            <span>{item.upvotes}</span>
          </div>
          <div className="info-container comment">
            <img src={commentsIcon} alt="chat bubble" />
            <span>{returnCommentsLength(item.comments)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default SuggestionCard;
