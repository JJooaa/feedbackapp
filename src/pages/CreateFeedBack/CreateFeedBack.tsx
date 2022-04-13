import GoBackHeader from "../../components/GoBackHeader/GoBackHeader";
import "./createFeedback.scss";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { ReactComponent as NewFeedBackIcon } from "../../assets/shared/icon-new-feedback1.svg";
import OptionList from "../../components/OptionList/OptionList";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { useAppDispatch, addData, useAppSelector } from "../../redux/dataSlice";
interface Values {
  title: string;
  category: string;
  description: string;
}

const options = ["Feature", "UI", "UX", "Enhancement", "Bug"];

const CreateFeedBack: React.FC = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.data.value);

  // what is the chosen value
  const [currentOption, setCurrentOption] = useState("Feature");
  // is the options menu open?
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const initialValues = {
    title: "",
    category: currentOption,
    description: "",
  };

  const handleIsOpen = () => {
    setIsOptionsOpen((prevState) => !prevState);
  };

  return (
    <>
      <main className="main" style={{ margin: "auto" }}>
        <div style={{ width: 600, margin: "auto", paddingBottom: 30 }}>
          <GoBackHeader page="create" />
        </div>
        <div className="create-container">
          <NewFeedBackIcon className="add-icon" />
          <h1>Create New Feedback</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {
                dispatch(
                  addData({
                    ...values,
                    id: data.length + 1,
                    upvotes: 0,
                    comments: [],
                    status: "suggestion",
                  })
                );
                setSubmitting(false);
              }, 1000);
            }}
          >
            <Form>
              <label>
                Feedback Title
                <p className="create-p">Add a short, descriptive headline</p>
                <Field id="title" name="title" />
              </label>

              <div>
                <label>Category</label>
                <p className="create-p">Choose a category for your feedback</p>
                <Field
                  id={currentOption}
                  name={currentOption}
                  value={currentOption}
                  onClick={() => handleIsOpen()}
                />
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

              <label>
                Feedback Detail
                <p className="create-p">
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <Field id="description" name="description" as="textarea" />
              </label>
              <div className="form-buttons">
                <Button
                  text="Add Feedback"
                  link=""
                  color="#AD1FEA"
                  type="submit"
                />
                <Button text="Cancel" link="/feedbacks" color="#3A4374" />
              </div>
            </Form>
          </Formik>
        </div>
      </main>
    </>
  );
};

export default CreateFeedBack;
