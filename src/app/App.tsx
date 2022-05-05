import React from "react";
import "./App.scss";
import Feedbacks from "../pages/Feedbacks/Feedbacks";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeedbackDetail from "../pages/FeedbackDetail/FeedbackDetail";
import CreateFeedBack from "../pages/CreateFeedBack/CreateFeedBack";
import Roadmap from "../pages/Roadmap/Roadmap";
import { Provider } from "react-redux";
import store from "./store";
import EditFeedback from "../pages/EditFeedback/EditFeedback";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Feedbacks />} />
          <Route path="/feedbacks/:id" element={<FeedbackDetail />} />
          <Route path="/feedbacks/create" element={<CreateFeedBack />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/feedbacks/:id/edit" element={<EditFeedback />} />
          <Route
            path="*"
            element={
              <div>
                Error!!
                <Link to="/">Go home</Link>
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
