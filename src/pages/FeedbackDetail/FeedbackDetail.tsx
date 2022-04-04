import { useState, useEffect, useCallback } from "react";
import SuggestionCard from "../../components/SuggestionCard/SuggestionCard";
import "./feedbackdetail.scss";
import { useParams } from "react-router-dom";
import CommentList from "../../components/Comments/CommentList";
import GoBackHeader from "../../components/GoBackHeader/GoBackHeader";
import { useAppSelector } from "../../redux/dataSlice";

const FeedbackDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);

  const placeholder = useAppSelector((state) => state.data.value);

  const getItemWithId = useCallback(async () => {
    let item = placeholder.filter((item: any) => item.id === Number(id));
    return item;
  }, [id, placeholder]);

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
      <GoBackHeader page="detail" />
      <main className="main">
        <SuggestionCard item={item[0]} />
        <CommentList comment={item[0].comments} setItem={setItem} />
      </main>
    </>
  );
};

export default FeedbackDetail;
