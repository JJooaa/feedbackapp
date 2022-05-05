import SuggestionCard from "../../components/FeedbackCard/FeedbackCard";
import "./feedbackdetail.scss";
import { Link, useParams } from "react-router-dom";
import CommentList from "../../components/Comments/CommentList";
import { useAppSelector } from "../../slices/dataSlice";
import arrowLeft from "../../assets/shared/icon-arrow-left.svg";
import Button from "../../components/Button/Button";

const FeedbackDetail = () => {
  const { id } = useParams();

  const selectedItem = useAppSelector((state) =>
    state.data.value.find((item: { id: number }) => item.id === Number(id))
  );

  if (id === "edit") return <div>Wrong url</div>;

  return (
    <>
      <main className="detail-main">
        <header className="detail-header">
          <div>
            <img src={arrowLeft} alt="arrow-left" />
            <Link to="/">Go Back</Link>
          </div>
          <Button
            text="Edit Feedback"
            color="#4661e6"
            link={`/feedbacks/${id}/edit`}
          />
        </header>
        <SuggestionCard item={selectedItem} page="detail" />
        <CommentList comment={selectedItem.comments} />
      </main>
    </>
  );
};

export default FeedbackDetail;
