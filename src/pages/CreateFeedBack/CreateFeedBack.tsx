import GoBackHeader from "../../components/GoBackHeader/GoBackHeader";
import "./createFeedback.scss";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { ReactComponent as NewFeedBackIcon } from "../../assets/shared/icon-new-feedback1.svg";
import OptionList from "../../components/OptionList/OptionList";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { useAppDispatch } from "../../redux/dataSlice";
import addItem from "../../redux/dataSlice";
interface Values {
  title: string;
  category: string;
  detail: string;
}

const options = ["Feature", "UI", "UX", "Enhancement", "Bug"];

const initialValues = {
  title: "",
  category: "",
  detail: "",
};

const CreateFeedBack: React.FC = () => {
  const dispatch = useAppDispatch();

  const test = () => {
    dispatch(
      addItem({
        id: 15,
        title: "test",
        category: "test",
        upvotes: 5,
        status: "suggestion",
        description: "asdjadklsjlasd",
        comments: [],
      })
    );
  };
  // what is the chosen value
  const [currentOption, setCurrentOption] = useState("Feature");
  // is the options menu open?
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOptionsOpen((prevState) => !prevState);
  };

  return (
    <>
      <main className="main">
        <GoBackHeader page="create" />
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
                console.log(values);
              }, 200);
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
                  id="category"
                  name="category"
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
                <Field id="detail" name="detail" as="textarea" />
              </label>
              <div className="form-buttons">
                <Button text="Add Feedback" link="" color="#AD1FEA" />
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
