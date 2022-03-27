import SuggestionCard from "../components/SuggestionCard/SuggestionCard";
import data from "../data.json";
import Layout from "../components/Layout/Layout";
import React, { useState } from "react";
import Empty from "../components/Empty/Empty";

const Feedbacks: React.FC = () => {
    // data = data  <-- we use it to filter from the filteredList
    // filteredList that we render based on data
    const staticData = data.productRequests;
    const [filteredData, setFilteredData] = useState<any>([]);

    const changeSortBy = (type: string): void => {
        if (type === "Most Upvotes") {
            setFilteredData(staticData.sort((a, b) => b.upvotes - a.upvotes));
        }
        if (type === "Least Upvotes") {
            setFilteredData(staticData.sort((a, b) => a.upvotes - b.upvotes));
        }
        if (type === "Most Comments") {
            let undefinedComments = staticData.filter(
                (item) => item.comments === undefined
            );
            let definedComments = staticData.filter(
                (item) => item.comments !== undefined
            );
            setFilteredData([
                ...definedComments.sort(
                    (a: any, b: any) => b.comments.length - a.comments.length
                ),
                ...undefinedComments,
            ]);
        }
    };

    const options = [
        "Most Upvotes",
        "Least Upvotes",
        "Most Comments",
        "Least Comments",
    ];

    console.log(filteredData);
    return (
        <Layout>
            <button onClick={() => changeSortBy(options[2])}>Click</button>
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
