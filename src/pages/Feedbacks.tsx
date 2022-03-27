import SuggestionCard from "../components/SuggestionCard/SuggestionCard";
import data from "../data.json";
import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import Empty from "../components/Empty/Empty";

const Feedbacks = () => {
    const staticData = data.productRequests;
    const [filteredData, setFilteredData] = useState<{}[]>(staticData);

    return (
        <Layout
            staticData={staticData}
            setFilteredData={setFilteredData}
            filteredData={filteredData}
        >
            {filteredData.length !== 0 ? (
                filteredData.map((item: any, index: number) => (
                    <SuggestionCard key={index} item={item} />
                ))
            ) : (
                <Empty />
            )}
        </Layout>
    );
};

export default Feedbacks;
