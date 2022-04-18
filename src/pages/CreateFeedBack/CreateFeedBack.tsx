import "./createFeedback.scss";
import newFeedBackIcon from "../../assets/shared/icon-new-feedback1.svg";
import { Link } from "react-router-dom";
import arrowLeft from "../../assets/shared/icon-arrow-left.svg";
import FormikForm from "../../components/Form/Formik";

const CreateFeedBack: React.FC = () => {
  return (
    <main className="create-feedback">
      <Link to="/feedbacks">
        <img src={arrowLeft} alt="left pointing arrow" />
        Go Back
      </Link>

      <div className="create-feedback-form-container">
        <img
          src={newFeedBackIcon}
          className="form-add-icon"
          alt="plus sign with purple background"
        />
        <h1>Create New Feedback</h1>

        <FormikForm page="create" />
      </div>
    </main>
  );
};

export default CreateFeedBack;
