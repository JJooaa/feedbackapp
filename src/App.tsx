import React, { useEffect } from "react";
import "./App.css";
import Feedbacks from "./pages/Feedbacks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackDetail from "./components/FeedbackDetail/FeedbackDetail";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/feedbacks" element={<Feedbacks />} />
                <Route path="/feedbacks/:id" element={<FeedbackDetail />} />
                <Route path="*" element={<div>Not found</div>} />
            </Routes>
        </Router>
    );
};

export default App;
