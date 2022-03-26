import "../../styles/comment.scss";

interface Props {
    comment: {
        content: "string";
        id: number;
        user: {
            image: string;
            name: string;
            username: string;
        };
        replies?: {}[];
    }[];
}

const Comment = ({ comment }: Props) => {
    console.log(`../.${comment[0].user.image}`);
    return (
        <>
            {comment.map((item, index) => (
                <div className="comment-container">
                    <div className="comment-user">
                        <img
                            className="user-image"
                            src={`../.${comment[index].user.image}`}
                            alt="poop"
                        />
                    </div>
                    <div>{item.content}</div>
                </div>
            ))}
        </>
    );
};

export default Comment;
