import * as Yup from "yup";

// when adding a new feedback from /feedbacks/create
export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Minimum 10 characters")
    .max(100, "Too long!")
    .required("Can't be empty"),
  description: Yup.string()
    .min(10, "Minumum 10 characters")
    .max(250, "Too long!")
    .required("Can't be empty"),
});
