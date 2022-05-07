import React from "react";
import "./FeedbackCard.scss";
import { ReactComponent as UpArrow } from "../../assets/shared/icon-arrow-up.svg";
import commentsIcon from "../../assets/shared/icon-comments.svg";
import { Link, useNavigate } from "react-router-dom";
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
  let navigate = useNavigate();

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

  // handles the colored dot on the roadmap page
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

  // mobile version of the feedbackcard, also render this is all across roadmap
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
          {item.title}
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

  // feedbackcard for tablet and above
  const renderResponsiveVersion = () => {
    return (
      <>
        <div className="info-texts">
          {item.title}
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

  // if the page is roadmap we wanna have the mobile version of the feedbackcard
  const renderFeedbackCard = () => {
    if (page === "roadmap") return renderMobileVersion();
    if (width > 767) return renderResponsiveVersion();
    if (width < 767) return renderMobileVersion();
  };

  return (
    <div
      className={
        page !== "roadmap" ? "feedbackcard responsive" : "feedbackcard"
      }
      onClick={() => navigate(`/feedbacks/${item.id}`)}
    >
      {renderFeedbackCard()}
    </div>
  );
};

export default FeedbackCard;
