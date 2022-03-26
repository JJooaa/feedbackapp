import SuggestionCard from "../components/SuggestionCard/SuggestionCard";
import data from "../data.json";
import Layout from "../components/Layout/Layout";
import React from "react";
import Empty from "../components/Empty/Empty";

const Feedbacks: React.FC = () => {
    console.log(data.productRequests.map((item) => item));
    return (
        <Layout>
            {data.productRequests.length !== 0 ? (
                data.productRequests.map((item: any, index: number) => (
                    <SuggestionCard key={index} item={item} />
                ))
            ) : (
                <Empty />
            )}
        </Layout>
    );
};

export default Feedbacks;
