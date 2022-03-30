import React from "react";
import "./optionList.scss";

const OptionList = ({
  array,
  renderCheckIcon,
  changeSortBy,
  handleSortBy,
}: any) => {
  return (
    <ul className="options-list">
      {array.map((item: any, index: number) => (
        <li key={index} onClick={() => {}}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default OptionList;
