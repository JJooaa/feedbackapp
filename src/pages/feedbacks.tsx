import FeedBackCard from "../components/feedbackcard/feedbackcard";
import data from "../data.json";
import Layout from "../components/layout/layout";
import React from "react";
import Empty from "../components/empty/empty";

const Feedbacks: React.FC = () => {
    return (
        <Layout>
            {data.productRequests.length !== 0 ? (
                data.productRequests.map((item: any, index: number) => (
                    <FeedBackCard key={index} item={item} />
                ))
            ) : (
                <Empty />
            )}
        </Layout>
    );
};

export default Feedbacks;
