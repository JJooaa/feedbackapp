import "./createFeedback.scss";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import newFeedBackIcon from "../../assets/shared/icon-new-feedback1.svg";
import { Link } from "react-router-dom";
import OptionList from "../../components/OptionList/OptionList";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { useAppDispatch, addData } from "../../slices/dataSlice";
import arrowLeft from "../../assets/shared/icon-arrow-left.svg";
import { validationSchema } from "../../helpers";

interface Values {
  title: string;
  description: string;
}

const options = ["Feature", "UI", "UX", "Enhancement", "Bug"];

const CreateFeedBack: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const [currentOption, setCurrentOption] = useState("Feature");

  const initialValues = {
    title: "",
    description: "",
  };

  const handleIsOpen = () => {
    setIsOptionsOpen((prevState) => !prevState);
  };

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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            dispatch(addData({ ...values, category: currentOption }));
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <label>Feedback Title</label>
                <p>Add a short, descriptive headline</p>
                <Field
                  id="title"
                  name="title"
                  style={
                    errors.title && touched.title === true
                      ? { outline: "1px solid red" }
                      : null
                  }
                />
                <ErrorMessage className="error" name="title" component="div" />
              </div>

              <div>
                <label>Category</label>
                <p>Choose a category for your feedback</p>
                <Field value={currentOption} onClick={handleIsOpen} />
                {isOptionsOpen && (
                  <OptionList
                    page="create"
                    array={options}
                    currentOption={currentOption}
                    setCurrentOption={setCurrentOption}
                    handleIsOpen={handleIsOpen}
                  />
                )}
              </div>

              <div>
                <label>Feedback Detail</label>
                <p>
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  style={
                    errors.description && touched.description === true
                      ? { outline: "1px solid red" }
                      : null
                  }
                />
                <ErrorMessage
                  className="error"
                  name="description"
                  component="div"
                />
              </div>

              <div className="create-feedback-form-buttons">
                <Button
                  text="Add Feedback"
                  link=""
                  color="#AD1FEA"
                  type="submit"
                />
                <Button text="Cancel" link="/feedbacks" color="#3A4374" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default CreateFeedBack;
