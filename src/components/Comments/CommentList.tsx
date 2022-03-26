import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "../../styles/commentList.scss";
import Button from "../Button/Button";
import SingleComment from "./SingleComment";

interface User {
    username: string;
    name: string;
    image: string;
}
interface Props {
    comment: {
        content: "string";
        id: number;
        user: User;
        replies?: {}[];
    }[];
}

const CommentList = ({ comment }: Props) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [state, setState] = useState<number>(0);

    const handleValueChange = (): void => {
        if (textAreaRef.current?.value.length !== undefined) {
            setState(textAreaRef.current?.value.length);
        }
    };

    console.log(state);
    return (
        <>
            <div className="comments-wrapper">
                <h1>{comment && comment.length} Comments</h1>
                {comment &&
                    comment.map((item, index) => (
                        <SingleComment key={index} index={index} item={item} />
                    ))}
            </div>
            <div className="leave-comment-container">
                <h2>Add Comment</h2>
                <textarea
                    name=""
                    id=""
                    placeholder="Type your comment here"
                    maxLength={250}
                    ref={textAreaRef}
                    onChange={handleValueChange}
                ></textarea>
                <div>
                    <p>{250 - state}</p>
                    <Button text="Post Comment" color="#AD1FEA" />
                </div>
            </div>
        </>
    );
};

export default CommentList;
