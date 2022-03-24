import React from "react";
import "../../styles/feedbackcard.scss";
import upArrow from "../../assets/shared/icon-arrow-up.svg";
import commentsIcon from "../../assets/shared/icon-comments.svg";

interface Props {
    item: {
        title: string;
        description: string;
        category: string;
        upvotes: number;
        comments: object[];
        id?: number;
    };
}

const FeedBackCard: React.FC<Props> = ({ item }) => {
    const returnCommentsLength = (commentsArray: object[]) => {
        return commentsArray === undefined ? 0 : commentsArray.length;
    };

    const firstLetterToUpperCase = (data: string) => {
        let array = data.split("");
        let firstLetter = array[0].toUpperCase();
        return [firstLetter, ...array.slice(1, array.length)].join("");
    };

    return (
        <div className="feedbackcard">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <div className="category">
                <h2>{firstLetterToUpperCase(item.category)}</h2>
            </div>
            <div className="data">
                <div className="info-container category">
                    <img alt="arrow pointing up" src={upArrow} />
                    <span>{item.upvotes}</span>
                </div>
                <div className="info-container">
                    <img src={commentsIcon} alt="chat bubble" />
                    <span>{returnCommentsLength(item.comments)}</span>
                </div>
            </div>
        </div>
    );
};

export default FeedBackCard;
