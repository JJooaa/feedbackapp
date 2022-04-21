import React from "react";
import "./FeedbackCard.scss";
import { ReactComponent as UpArrow } from "../../assets/shared/icon-arrow-up.svg";
import commentsIcon from "../../assets/shared/icon-comments.svg";
import { Link } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import {
  upvotePost,
  useAppDispatch,
  useAppSelector,
} from "../../slices/dataSlice";

interface Props {
  item: {
    title: string;
    description: string;
    category: string;
    upvotes: number;
    comments: {
      id: number;
      replies: any;
    }[];
    status: string;
    id: number;
  };
  page: string;
}

const FeedbackCard: React.FC<Props> = ({ item, page }) => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();

  const upvotes = useAppSelector((state) => state.data.user.upvotes);

  const handleHasUpvoted = (value: string) => {
    const isTrue = upvotes.includes(item.id);
    if (value === "number") return isTrue ? "upvoted " : "";
    if (value === "arrow") return isTrue ? "white" : "#4661E6";
  };

  const returnCommentsLength = (commentsArray: {}[]): number => {
    return commentsArray === undefined ? 0 : commentsArray.length;
  };

  const firstLetterToUpperCase = (data: string): string => {
    let array = data.split("");
    let firstLetter = array[0].toUpperCase();
    return [firstLetter, ...array.slice(1, array.length)].join("");
  };

  const handleDot = () => {
    if (item.status === "planned") {
      return "dot orange-d";
    }
    if (item.status === "in-progress") {
      return "dot purple-d";
    }
    if (item.status === "live") {
      return "dot blue-d";
    }
  };

  const renderMobileVersion = () => {
    return (
      <>
        {page === "roadmap" && (
          <li>
            <span className={handleDot()}></span>
            <span>{firstLetterToUpperCase(item.status)}</span>
          </li>
        )}
        <div className="info-texts">
          <Link to={`/feedbacks/${item.id}`}>{item.title}</Link>
          <p>{item.description}</p>
        </div>
        <div className="bubble">
          <h2>{firstLetterToUpperCase(item.category)}</h2>
        </div>
        <div className="mobile-wrapper">
          <div
            onClick={() => dispatch(upvotePost(Number(item.id)))}
            className={
              handleHasUpvoted("number") + "info-container bubble upvote"
            }
          >
            <UpArrow stroke={handleHasUpvoted("arrow")} />
            <span>{item.upvotes}</span>
          </div>
          <div className="info-container">
            <img src={commentsIcon} alt="chat bubble" />
            <span>{returnCommentsLength(item.comments)}</span>
          </div>
        </div>
      </>
    );
  };

  const renderTabletDesktopVersion = () => {
    return (
      <>
        <div className="info-texts">
          <Link to={`/feedbacks/${item.id}`}>{item.title}</Link>
          <p>{item.description}</p>
          <div className="bubble">
            <h2>{firstLetterToUpperCase(item.category)}</h2>
          </div>
        </div>
        <div
          onClick={() => dispatch(upvotePost(Number(item.id)))}
          className={
            handleHasUpvoted("number") + "info-container bubble order1 upvote"
          }
        >
          <UpArrow stroke={handleHasUpvoted("arrow")} />
          <span>{item.upvotes}</span>
        </div>
        <div className="info-container flex-end">
          <img src={commentsIcon} alt="chat bubble" />
          <span>{returnCommentsLength(item.comments)}</span>
        </div>
      </>
    );
  };

  return (
    <div className="feedbackcard">
      {width < 700 ? renderMobileVersion() : renderTabletDesktopVersion()}
    </div>
  );
};

export default FeedbackCard;
