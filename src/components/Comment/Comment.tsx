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
    return (
        <div className="comments-wrapper">
            <h1>{comment.length} Comments</h1>
            {comment.map((item, index) => {
                const image = item.user.image.slice(21, item.user.image.length);
                return (
                    <div className="comment-container">
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
                                <h3>Reply</h3>
                            </div>
                        </div>
                        <div>{item.content}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Comment;
