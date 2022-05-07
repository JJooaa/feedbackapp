import { useState } from "react";
import "./feedbacks.scss";
import hamburger from "../../assets/shared/mobile/icon-hamburger.svg";
import Menu from "../../components/Menu/Menu";
import close from "../../assets/shared/mobile/icon-close.svg";
import Button from "../../components/Button/Button";
import { ReactComponent as DownArrow } from "../../assets/shared/icon-arrow-down.svg";
import { ReactComponent as UpArrow } from "../../assets/shared/icon-arrow-up.svg";
import Empty from "../../components/Empty/Empty";
import FeedbackCard from "../../components/FeedbackCard/FeedbackCard";
import OptionList from "../../components/OptionList/OptionList";
import { useWindowSize } from "usehooks-ts";
import { useAppSelector } from "../../slices/dataSlice";
import { ReactComponent as Bulb } from "../../assets/suggestions/tablet/bulb 2.svg";

const options = [
  "Most Upvotes",
  "Least Upvotes",
  "Most Comments",
  "Least Comments",
];

const Feedbacks = () => {
  const { width } = useWindowSize();

  const data = useAppSelector((state: any) => state.data.value);

  const [isHamburgerOpen, setHamburgerIsOpen] = useState(false);
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState("Most Upvotes");

  const [currentCategory, setCurrentCategory] = useState("All");

  function onHamburgerClick() {
    setHamburgerIsOpen((prevState) => !prevState);
    !isHamburgerOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "initial");
  }

  function handleIsSortByOpen() {
    setIsSortByOpen((prevState) => !prevState);
  }

  function test(data: any) {
    if (currentOption === "Most Upvotes") {
      return data.sort(
        (a: { upvotes: number }, b: { upvotes: number }) =>
          b.upvotes - a.upvotes
      );
    }
    if (currentOption === "Least Upvotes") {
      return data.sort(
        (a: { upvotes: number }, b: { upvotes: number }) =>
          a.upvotes - b.upvotes
      );
    }
    if (currentOption === "Most Comments" || currentOption === "Least Comments")
      return handleSortByComments(data);
  }

  function handleSortByComments(data: []) {
    let undefinedComments = data.filter(
      (item: { comments: [] }) => item.comments === undefined
    );
    let definedComments = data.filter(
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
  }

  function handleCategoryChange() {
    const singleCategory = data.filter(
      (item: { category: string }) =>
        item.category.toLowerCase() === currentCategory.toLowerCase()
    );
    if (currentCategory === "All") return test([...data]);
    return test(singleCategory);
  }

  function renderMobileHeader() {
    return (
      <header className="feedbacks-header">
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
    );
  }

  // tablet and desktop header
  function renderProgressiveSecondHeader() {
    return (
      <header className="feedbacks-second-header">
        {width > 767 && (
          <h2>
            <Bulb />
            {handleCategoryChange().length} Suggestions
          </h2>
        )}
        <p>
          Sort by :
          <span onClick={handleIsSortByOpen}>
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
            handleIsOpen={handleIsSortByOpen}
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
      </header>
    );
  }

  return (
    <div className="feedbacks">
      {isHamburgerOpen && width < 767 && (
        <Menu
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
        />
      )}
      {width > 767 && (
        <Menu
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
        />
      )}
      {width < 767 && renderMobileHeader()}
      {width < 767 && renderProgressiveSecondHeader()}
      <main className="feedbacks-content-main">
        {width > 767 && renderProgressiveSecondHeader()}
        {data.length !== 0 ? (
          handleCategoryChange().map((item: any) => (
            <FeedbackCard key={item.id} item={item} page="feedbacks" />
          ))
        ) : (
          <Empty />
        )}
      </main>
    </div>
  );
};

export default Feedbacks;
