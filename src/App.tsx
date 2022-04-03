import React, { useContext, createContext } from "react";
import "./App.css";
import Feedbacks from "./pages/Feedbacks/Feedbacks";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeedbackDetail from "./components/FeedbackDetail/FeedbackDetail";
import CreateFeedBack from "./pages/CreateFeedBack/CreateFeedBack";
import data from "./data.json";
import Roadmap from "./pages/Roadmap/Roadmap";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/feedbacks/:id" element={<FeedbackDetail />} />
        <Route path="/feedbacks/create" element={<CreateFeedBack />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route
          path="*"
          element={
            <div>
              Error!!
              <Link to="/feedbacks">Go to feedbacks</Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
