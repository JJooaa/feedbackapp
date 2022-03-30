import GoBackHeader from "../../components/GoBackHeader/GoBackHeader";
import "./createFeedback.scss";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { ReactComponent as NewFeedBackIcon } from "../../assets/shared/icon-new-feedback1.svg";
interface Values {
    title: string;
    category: string;
    detail: string;
}

const CreateFeedBack = () => {
    const initialValues = {
        title: "",
        category: "",
        detail: "",
    };
    return (
        <>
            <GoBackHeader />
            <main className="main">
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
                            <div>
                                <label>Feedback Title</label>
                                <p>Add a short, descriptive headline</p>
                                <Field id="title" name="title" />
                            </div>

                            <div>
                                <label>Category</label>
                                <p>Choose a category for your feedback</p>
                                <Field id="category" name="category" />
                            </div>
                            <div>
                                <label>Feedback Detail</label>
                                <p>
                                    Include any specific comments on what should
                                    be improved, added, etc.
                                </p>
                                <Field
                                    id="detail"
                                    name="detail"
                                    as="textarea"
                                />
                            </div>
                        </Form>
                    </Formik>
                </div>
            </main>
        </>
    );
};

export default CreateFeedBack;
