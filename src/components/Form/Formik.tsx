import React, { useState } from "react";
import { Formik, Field, ErrorMessage, FormikHelpers, Form } from "formik";
import { validationSchema } from "../../helpers";
import { useAppDispatch } from "../../slices/dataSlice";
import { addData } from "../../slices/dataSlice";
import Button from "../Button/Button";
import OptionList from "../OptionList/OptionList";

interface Props {
  currentOption: string;
  setCurrentOption: (value: string) => void;
  initialValues: Values;
  options: string[];
}

interface Values {
  title: string;
  description: string;
}

const FormikForm: React.FC<Props> = ({
  initialValues,
  currentOption,
  setCurrentOption,
  options,
}) => {
  const dispatch = useAppDispatch();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOptionsOpen((prevState) => !prevState);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
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
            <Button text="Add Feedback" link="" color="#AD1FEA" type="submit" />
            <Button text="Cancel" link="/feedbacks" color="#3A4374" />
            <Button text="Delete" link="/feedbacks" color="#D73737" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
