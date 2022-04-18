import FormikForm from "../../components/Form/Formik";
import arrowLeft from "../../assets/shared/icon-arrow-left.svg";
import { Link, useParams } from "react-router-dom";
import editFeedBackIcon from "../../assets/shared/icon-edit-feedback.svg";
import { useAppSelector } from "../../slices/dataSlice";

const EditFeedback = () => {
  const { id } = useParams();
  const selectedItem = useAppSelector((state) =>
    state.data.value.find((item: { id: number }) => item.id === Number(id))
  );

  return (
    <main className="create-feedback">
      <Link to="/feedbacks">
        <img src={arrowLeft} alt="left pointing arrow" />
        Go Back
      </Link>

      <div className="create-feedback-form-container">
        <img
          src={editFeedBackIcon}
          className="form-add-icon"
          alt="plus sign with purple background"
        />
        <h1>Editing '{selectedItem.title}'</h1>

        <FormikForm page="edit" selectedItem={selectedItem} />
      </div>
    </main>
  );
};

export default EditFeedback;
