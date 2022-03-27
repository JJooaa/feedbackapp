import React, { useState } from "react";

interface Props {
    filteredData: {}[];
    staticData: {}[];
    setFilteredData: React.Dispatch<React.SetStateAction<{}[]>>;
}
const TestComponent: React.FC<Props> = ({
    staticData,
    children,
    setFilteredData,
    filteredData,
}) => {
    const handleChange = (value: string): void => {
        if (value === "Joa") {
            setFilteredData(
                staticData.sort((a: any, b: any) => a.upvotes - b.upvotes)
            );
            console.log(filteredData);
        }
    };

    return (
        <div>
            Hello
            <button onClick={() => handleChange("Joa")}>Test</button>
            {children}
        </div>
    );
};

export default TestComponent;
