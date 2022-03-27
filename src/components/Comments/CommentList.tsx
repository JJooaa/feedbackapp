import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "../../styles/commentList.scss";
import Button from "../Button/Button";
import PostComment from "./PostComment";
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
    return (
        <>
            <div className="comments-wrapper">
                <h1>{comment && comment.length} Comments</h1>
                {comment &&
                    comment.map((item, index) => (
                        <SingleComment key={index} index={index} item={item} />
                    ))}
            </div>
            <PostComment />
        </>
    );
};

export default CommentList;
