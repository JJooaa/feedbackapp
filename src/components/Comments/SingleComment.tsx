import { useState } from "react";
import PostReply from "../PostReply/PostReply";

interface User {
    username: string;
    name: string;
    image: string;
}

interface Props {
    index: number;
    item: {
        id: number;
        content: string;
        user: User;
        replies?: {}[];
    };
}

const SingleComment = ({ index, item }: Props) => {
    const [isReplying, setIsReplying] = useState<boolean>(false);

    const handleReplyClick = (): void => {
        setIsReplying((prevState) => !prevState);
    };
    const image = item.user.image.slice(21, item.user.image.length);

    return (
        <div key={index} className="comment-container">
            <div className="comment-user">
                <img
                    className="user-image"
                    src={require(`../../assets/user-images/${image}`)}
                    alt="poop"
                />
                <div className="user-info-wrapper">
                    <div className="user-info">
                        <h2>{item.user.name}</h2>
                        <p>@{item.user.username}</p>
                    </div>
                    <h3 onClick={handleReplyClick}>Reply</h3>
                </div>
            </div>
            <div>{item.content}</div>
            {isReplying && <PostReply />}
        </div>
    );
};

export default SingleComment;
