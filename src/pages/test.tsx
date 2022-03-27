import React, { useState } from "react";
import data from "../data.json";
import TestComponent from "./testCompoent";

const Test = () => {
    const staticData = data.productRequests;
    const [filteredData, setFilteredData] = useState<{}[]>(staticData);

    return (
        <TestComponent
            staticData={staticData}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
        ></TestComponent>
    );
};

export default Test;
