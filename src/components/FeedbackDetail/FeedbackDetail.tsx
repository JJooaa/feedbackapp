import React, { useState, useEffect, useCallback } from "react";
import SuggestionCard from "../SuggestionCard/SuggestionCard";
import "../../styles/feedbackdetail.scss";
import Button from "../Button/Button";
import arrowLeft from "../../assets/shared/icon-arrow-left.svg";
import data from "../../data.json";
import { Link, useParams } from "react-router-dom";
import Comment from "../Comments/CommentList";

const FeedbackDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState<any>(null);

    const getItemWithId = useCallback(async () => {
        let item = data.productRequests.filter((item) => item.id === Number(id));
        console.log(item);
        return item;
    }, [id]);

    useEffect(() => {
        const getItem = async () => {
            const item = await getItemWithId();
            setItem(item);
        };
        getItem();
    }, [getItemWithId]);

    if (!item) return <main className="main">Boggedasda</main>;

    return (
        <>
            <header className="second-header">
                <div className="go-back">
                    <img src={arrowLeft} alt="arrow-left" />
                    <Link className="detail-back" to="/feedbacks">
                        Go Back
                    </Link>
                </div>
                <Button text="Edit Feedback" color="#4661E6" />
            </header>
            <main className="main">
                <SuggestionCard item={item[0]} />
                <Comment comment={item[0].comments} />
            </main>
        </>
    );
};

export default FeedbackDetail;
