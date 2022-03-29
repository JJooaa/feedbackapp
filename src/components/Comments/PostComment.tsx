import { useRef, useState } from "react";
import Button from "../Button/Button";

const PostComment = (): JSX.Element => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [state, setState] = useState<number>(0);

    const handleValueChange = (): void => {
        if (textAreaRef.current?.value.length !== undefined) {
            setState(textAreaRef.current?.value.length);
        }
    };

    return (
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
                <p>{250 - state} characters left</p>
                <Button
                    text="Post Comment"
                    color="#AD1FEA"
                    link="feedbacks/create"
                />
            </div>
        </div>
    );
};

export default PostComment;
