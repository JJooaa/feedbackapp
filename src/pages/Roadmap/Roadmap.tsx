import { useState } from "react";
import { useWindowSize } from "usehooks-ts";
import SuggestionCard from "../../components/FeedbackCard/FeedbackCard";
import { useAppSelector } from "../../redux/dataSlice";
import "./roadmap.scss";
import arrowLeft from "../../assets/shared/icon-arrow-left.svg";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

const Roadmap = () => {
  const { width } = useWindowSize();

  const data = useAppSelector((state) => state.data.value);

  const [currentSelect, setCurrentSelect] = useState("In-Progress");

  const planned = data.filter(
    (item: { status?: string }) => item.status === "planned"
  );
  const inProgress = data.filter(
    (item: { status?: string }) => item.status === "in-progress"
  );
  const live = data.filter(
    (item: { status?: string }) => item.status === "live"
  );

  // based on currentSelect prop we decide which of the array to render
  // and we have the necessary setup properties based on objects
  const options = [
    {
      text: "Planned",
      arrayLength: planned.length,
      description: "Ideas prioritized for research",
      item: planned,
    },
    {
      text: "In-Progress",
      arrayLength: inProgress.length,
      description: "Currently being developed",
      item: inProgress,
    },
    {
      text: "Live",
      arrayLength: live.length,
      description: "Released features",
      item: live,
    },
  ];

  // return options.item based on (currentSelect === "Planned") ->  {
  //   text: "Planned",
  //   number: planned.length,
  //   description: "Ideas prioritized for research",
  //   item: planned,
  // },
  const array = options.filter((item) => currentSelect === item.text);

  // renders border top color based on currentOption eg. Planned -> orange
  const borderTopColoringTablet = (item: { status?: string }) => {
    let value = "suggestion-card-top";
    if (item.status === "planned") return "orange " + value;
    if (item.status === "in-progress") return "purple " + value;
    if (item.status === "live") return "blue " + value;
  };

  // renders correct ::after pseudo element color for mobile
  const afterPseudoElementMobile = (item: { text: string }) => {
    return width < 700 && item.text === currentSelect
      ? `default active ${currentSelect.toLowerCase()}`
      : "default";
  };

  const renderMobileDescription = () => {
    return (
      width < 700 &&
      array.map((item) => (
        <p className="array-description">
          {item.text} ({item.arrayLength})<p>{item.description}</p>
        </p>
      ))
    );
  };

  return (
    <>
      <header className="roadmap-header">
        <Link to="/feedbacks">
          <img src={arrowLeft} alt="arrow-left" />
          Go Back
          <h2>Roadmap</h2>
        </Link>

        <Button
          text="+ Add Feedback"
          color="#AD1FEA"
          link="/feedbacks/create"
        />
      </header>

      <nav className="roadmap-second-header">
        <ul>
          {options.map((item, index) => (
            <li
              key={index}
              className={afterPseudoElementMobile(item)}
              onClick={() => setCurrentSelect(item.text)}
            >
              {item.text} ({item.arrayLength})
              {width > 700 && <p>{item.description}</p>}
            </li>
          ))}
        </ul>
      </nav>

      <main className="roadmap-main">
        {renderMobileDescription()}
        {array[0].item.map((item: any, index: number) => (
          <div className={borderTopColoringTablet(item)}>
            <SuggestionCard key={index} item={item} page="roadmap" />
          </div>
        ))}
      </main>
    </>
  );
};

export default Roadmap;
