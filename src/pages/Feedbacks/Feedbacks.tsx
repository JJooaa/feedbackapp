import React, { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../redux/dataSlice";

const options: Array<string> = [
  "Most Upvotes",
  "Least Upvotes",
  "Most Comments",
  "Least Comments",
];

const Feedbacks: React.FC = () => {
  const { width } = useWindowSize();

  // get data from redux
  const data = useAppSelector((state) => state.data);
  // make a copy, then render and sort the copy
  const [dataCopy, setDataCopy] = useState([...data]);

  const [isHamburgerOpen, setHamburgerIsOpen] = useState<boolean>(false);
  const [isSortByOpen, setIsSortByOpen] = useState<boolean>(false);
  const [currentOption, setCurrentOption] = useState<string>("Most Upvotes");

  const onHamburgerClick = (): void => {
    setHamburgerIsOpen((prevState) => !prevState);
  };

  const changeSortBy = (value: string): void => {
    if (value === "Most Upvotes") {
      setCurrentOption("Most Upvotes");
      let mostUpvotes = dataCopy.sort(
        (a: any, b: any) => b.upvotes - a.upvotes
      );
      setDataCopy((prevState) => [...(prevState = mostUpvotes)]);
    }
    if (value === "Least Upvotes") {
      setCurrentOption("Least Upvotes");
      let leastUpvotes = dataCopy.sort(
        (a: any, b: any) => a.upvotes - b.upvotes
      );
      setDataCopy((prevState) => [...(prevState = leastUpvotes)]);
    }
    if (value === "Most Comments") {
      setCurrentOption("Most Comments");
      let undefinedComments = dataCopy.filter(
        (item: any) => item.comments === undefined
      );
      let definedComments = dataCopy.filter(
        (item: any) => item.comments !== undefined
      );
      let sortDefined = definedComments
        .sort((a: any, b: any) => b.comments.length - a.comments.length)
        .concat(undefinedComments);
      setDataCopy((prevState) => [...(prevState = sortDefined)]);
    }
  };

  const handleIsOpen = (): void => {
    setIsSortByOpen((prevState) => !prevState);
  };

  useEffect(() => {
    changeSortBy("Most Upvotes");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isHamburgerOpen === true ? <Menu /> : width > 700 && <Menu />}
      {width < 700 && (
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

      <div className="secondheader">
        <p>
          Sort by :
          <span onClick={handleIsOpen}>
            {currentOption}
            {isSortByOpen === false ? (
              <DownArrow className="arrow" />
            ) : (
              <UpArrow className="arrow" />
            )}
          </span>
        </p>
        {isSortByOpen && (
          <OptionList
            changeSortBy={changeSortBy}
            array={options}
            handleIsOpen={handleIsOpen}
            page="feedbacks"
            currentOption={currentOption}
          />
        )}

        <Button
          text="+ Add Feedback"
          color="#AD1FEA"
          link="/feedbacks/create"
        />
      </div>

      <main className="main">
        {dataCopy.length !== 0 ? (
          dataCopy.map((item: any, index: number) => (
            <SuggestionCard key={index} item={item} />
          ))
        ) : (
          <Empty />
        )}
      </main>
    </>
  );
};

export default Feedbacks;
