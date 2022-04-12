import React, { useState } from "react";
import "./suggestioncard.scss";
import upArrow from "../../assets/shared/icon-arrow-up.svg";
import commentsIcon from "../../assets/shared/icon-comments.svg";
import { Link } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import {
  upvotePost,
  useAppDispatch,
  useAppSelector,
} from "../../redux/dataSlice";

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
  page: string;
}

const SuggestionCard: React.FC<Props> = ({ item, page }) => {
  const { width } = useWindowSize();

  const returnCommentsLength = (commentsArray: object[]): number => {
    return commentsArray === undefined ? 0 : commentsArray.length;
  };

  const dispatch = useAppDispatch();

  const firstLetterToUpperCase = (data: string): string => {
    let array = data.split("");
    let firstLetter = array[0].toUpperCase();
    return [firstLetter, ...array.slice(1, array.length)].join("");
  };

  const renderMobileVersion = () => {
    return (
      <div className="data">
        <div className="info-container bubble category upvote">
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
      {page === "roadmap" && width < 700 && (
        <li>{firstLetterToUpperCase(item.status)}</li>
      )}
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
          <div
            onClick={() => dispatch(upvotePost(Number(item.id)))}
            className="info-container bubble order1 upvote"
          >
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
