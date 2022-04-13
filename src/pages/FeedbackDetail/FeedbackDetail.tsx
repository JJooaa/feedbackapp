import SuggestionCard from "../../components/SuggestionCard/SuggestionCard";
import "./feedbackdetail.scss";
import { useParams } from "react-router-dom";
import CommentList from "../../components/Comments/CommentList";
import GoBackHeader from "../../components/GoBackHeader/GoBackHeader";
import { useAppSelector } from "../../redux/dataSlice";
import { useWindowSize } from "usehooks-ts";

const FeedbackDetail = () => {
  const { id } = useParams();
  const { width } = useWindowSize();
  const selectedItem = useAppSelector((state) =>
    state.data.value.filter((item: { id: number }) => item.id === Number(id))
  );

  if (id === "edit") return <div>Wrong url</div>;

  console.log(selectedItem);
  if (!selectedItem) return <main className="main">Error...</main>;

  return (
    <>
      <GoBackHeader page="detail" />
      <main
        className="main"
        style={width > 700 ? { margin: "auto", width: 730 } : undefined}
      >
        <SuggestionCard item={selectedItem[0]} page="detail" />
        <CommentList comment={selectedItem[0].comments} />
      </main>
    </>
  );
};

export default FeedbackDetail;
