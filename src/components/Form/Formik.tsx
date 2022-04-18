import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../../helpers";
import { addData, editPost, useAppDispatch } from "../../slices/dataSlice";
import Button from "../Button/Button";
import OptionList from "../OptionList/OptionList";

interface Props {
  page: string;
  selectedItem?: any;
}

interface Values {
  title: string;
  description: string;
}

const optionsStatus = ["Planned", "In-Progress", "Live"];
const optionsCategory = ["Feature", "UI", "UX", "Enhancement", "Bug"];

const FormikForm: React.FC<Props> = ({ page, selectedItem }) => {
  let navigate = useNavigate();

  const dispatch = useAppDispatch();

  // ===================== Form Values ================== //
  const initialValues = {
    title: selectedItem ? selectedItem.title : "",
    description: selectedItem ? selectedItem.description : "",
  };
  const [currentCategory, setCurrentCategory] = useState("Feature");

  // IF EDIT FORM
  const [currentStatus, setCurrentStatus] = useState("Planned");

  // =================================================== //

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const handleIsOpen = () => {
    setIsCategoryOpen((prevState) => !prevState);
  };

  const handleUpdateOpen = () => {
    setIsUpdateOpen((prevState) => !prevState);
  };

  const handleSubmit = (
    values: Values,
    setSubmitting: (value: boolean) => void
  ) => {
    if (page === "create") {
      dispatch(
        addData({
          ...values,
          category: currentCategory,
        })
      );
      setSubmitting(false);
      navigate("/feedbacks");
    }
    if (page === "edit") {
      dispatch(
        editPost({
          ...values,
          id: selectedItem.id,
          category: currentCategory,
          status: currentStatus,
        })
      );
      setSubmitting(false);
      navigate("/feedbacks");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        handleSubmit(values, setSubmitting);
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

          <div className="relative">
            <label>Category</label>
            <p>Choose a category for your feedback</p>
            <Field value={currentCategory} onClick={handleIsOpen} />
            {isCategoryOpen && (
              <OptionList
                array={optionsCategory}
                currentOption={currentCategory}
                setCurrentOption={setCurrentCategory}
                handleIsOpen={handleIsOpen}
              />
            )}
          </div>
          {page === "edit" && (
            <div className="relative">
              <label>Update Status</label>
              <p>Change feedback state</p>
              <Field value={currentStatus} onClick={handleUpdateOpen} />
              {isUpdateOpen && (
                <OptionList
                  array={optionsStatus}
                  currentOption={currentStatus}
                  setCurrentOption={setCurrentStatus}
                  handleIsOpen={handleUpdateOpen}
                />
              )}
            </div>
          )}
          <div>
            <label>Feedback Detail</label>
            <p>
              Include any specific comments on what should be improved, added,
              etc.
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
              text={page === "create" ? "Add Feedback" : "Save Changes"}
              link=""
              color="#AD1FEA"
              type="submit"
            />
            <Button text="Cancel" link="/feedbacks" color="#3A4374" />
            {page === "edit" && (
              <Button text="Delete" link="/feedbacks" color="#D73737" />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
