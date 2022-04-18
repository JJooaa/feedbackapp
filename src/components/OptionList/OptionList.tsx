import React from "react";
import "./optionList.scss";
import checkIcon from "../../assets/shared/icon-check.svg";

interface Props {
  // array that we loop over
  array: Array<string>;
  // handles the sorting order in Feedbacks
  handleIsOpen?: () => void;
  // Depending on page either "feedbacks" or "create" -> different functionality
  page?: string;
  // what is the chosen option
  currentOption: string;
  // changes the current option only if page is "create"
  setCurrentOption?: (value: string) => void;
}

const OptionList: React.FC<Props> = ({
  array,
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

  const handleFeedbacksOnClick = (item: string): void => {
    if (setCurrentOption && handleIsOpen) {
      // closes window onClick
      handleIsOpen();
      setCurrentOption(item);
    }
  };

  return (
    <ul
      className={page === "feedbacks" ? "options-list" : "options-list reset"}
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
