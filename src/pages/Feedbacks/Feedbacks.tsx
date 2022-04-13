import React, { useState } from "react";
import "./layout.scss";
import hamburger from "../../assets/shared/mobile/icon-hamburger.svg";
import Menu from "../../components/Menu/Menu";
import close from "../../assets/shared/mobile/icon-close.svg";
import Button from "../../components/Button/Button";
import { ReactComponent as DownArrow } from "../../assets/shared/icon-arrow-down.svg";
import { ReactComponent as UpArrow } from "../../assets/shared/icon-arrow-up.svg";
import Empty from "../../components/Empty/Empty";
import SuggestionCard from "../../components/SuggestionCard/SuggestionCard";
import OptionList from "../../components/OptionList/OptionList";
import { useWindowSize } from "usehooks-ts";
import { useAppSelector } from "../../redux/dataSlice";
import { ReactComponent as Bulb } from "../../assets/suggestions/tablet/bulb 2.svg";

const options: Array<string> = [
  "Most Upvotes",
  "Least Upvotes",
  "Most Comments",
  "Least Comments",
];

const Feedbacks: React.FC = () => {
  const { width } = useWindowSize();
  // get data from redux
  const data = useAppSelector((state: any) => state.data.value);

  const [isHamburgerOpen, setHamburgerIsOpen] = useState(false);
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState("Most Upvotes");

  const onHamburgerClick = () => {
    setHamburgerIsOpen((prevState) => !prevState);
  };

  const mostUpvotes: any = [...data].sort(
    (a: { upvotes: number }, b: { upvotes: number }) => b.upvotes - a.upvotes
  );

  const leastUpvotes: any = [...mostUpvotes].reverse();

  const handleSortByComments = () => {
    let undefinedComments = [...data].filter(
      (item: { comments: [] }) => item.comments === undefined
    );
    let definedComments = [...data].filter(
      (item: { comments: [] }) => item.comments !== undefined
    );
    let sortDefined = definedComments
      .sort((a: any, b: any) => b.comments.length - a.comments.length)
      .concat(undefinedComments);
    if (currentOption === "Most Comments") {
      return sortDefined;
    }
    if (currentOption === "Least Comments") {
      return sortDefined.reverse();
    }
  };

  // returns an array of the current sorted items
  const currentArrayRender = () => {
    if (currentOption === "Most Upvotes") {
      return mostUpvotes;
    }
    if (currentOption === "Least Upvotes") {
      return leastUpvotes;
    } else {
      return handleSortByComments();
    }
  };

  const handleIsOpen = () => {
    setIsSortByOpen((prevState) => !prevState);
  };

  // tablet and desktop header
  const renderSecondHeader = () => {
    return (
      <div className="secondheader">
        {width > 700 && (
          <h2>
            <Bulb />
            {data.length} Suggestions
          </h2>
        )}
        <p>
          Sort by :
          <span onClick={handleIsOpen}>
            {currentOption}
            {isSortByOpen === false ? (
              <DownArrow stroke="white" />
            ) : (
              <UpArrow stroke="white" />
            )}
          </span>
        </p>

        {isSortByOpen && (
          <OptionList
            array={options}
            handleIsOpen={handleIsOpen}
            page="feedbacks"
            currentOption={currentOption}
            setCurrentOption={setCurrentOption}
          />
        )}

        <Button
          text="+ Add Feedback"
          color="#AD1FEA"
          link="/feedbacks/create"
        />
      </div>
    );
  };

  return (
    <div
      style={
        width > 1000
          ? { display: "flex", justifyContent: "center", marginTop: 60 }
          : undefined
      }
    >
      {isHamburgerOpen === true ? <Menu /> : width > 700 && <Menu />}
      {width < 700 && (
        //mobile header
        <header className="header">
          <div>
            <h1>Frontend Mentor</h1>
            <h2>Feedback Board</h2>
          </div>
          <img
            src={isHamburgerOpen === false ? hamburger : close}
            alt="hamburger menu"
            onClick={onHamburgerClick}
          />
        </header>
      )}
      {width < 740 && renderSecondHeader()}
      <main className="main">
        {width > 740 && renderSecondHeader()}
        {data.length !== 0 ? (
          currentArrayRender().map((item: any) => (
            <SuggestionCard key={item.id} item={item} page="feedbacks" />
          ))
        ) : (
          <Empty />
        )}
      </main>
    </div>
  );
};

export default Feedbacks;
