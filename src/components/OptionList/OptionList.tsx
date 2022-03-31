import React from "react";
import "./optionList.scss";
import checkIcon from "../../assets/shared/icon-check.svg";

// complicated component for 2 different dropdowns
// takes props to decide what to do
interface Props {
  // array that we loop over
  array: Array<string>;
  // handles the sorting order in Feedbacks
  changeSortBy?: (value: string) => void;
  // close or open
  handleIsOpen: () => void;
  // Depending on page either "feedbacks" or "create" -> different functionality
  page: string;
  // what is the chosen option
  currentOption: string;
  // changes the current option only if page is "create"
  setCurrentOption?: (value: string) => void;
}

const OptionList: React.FC<Props> = ({
  array,
  changeSortBy,
  handleIsOpen,
  page,
  currentOption,
  setCurrentOption,
}) => {
  // checkmark for the current chosen option
  const renderCheckIcon = (item: string): JSX.Element | null => {
    return currentOption === item ? (
      <img src={checkIcon} className="check-icon" alt="checkicon" />
    ) : null;
  };

  // if we are on page "feedbacks" -> change the sort order and close window on click
  const handleFeedbacksOnClick = (item: string): void => {
    if (page === "feedbacks" && changeSortBy && handleIsOpen) {
      // closes window onClick
      handleIsOpen();
      // changes sort order and the value which we show
      changeSortBy(item);
    }
    // if we are on page "create" we dont have to sort anything, just change the value
    if (page === "create" && setCurrentOption && handleIsOpen) {
      handleIsOpen();
      setCurrentOption(item);
    }
  };

  return (
    <ul
      className={
        page === "feedbacks" ? "options-list" : "options-list noabsolute"
      }
    >
      {array.map((item: string, index: number) => (
        <li
          key={index}
          onClick={() => {
            handleFeedbacksOnClick(item);
          }}
        >
          {item}
          {renderCheckIcon(item)}
        </li>
      ))}
    </ul>
  );
};

export default OptionList;
