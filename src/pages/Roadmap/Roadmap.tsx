import { useState } from "react";
import { useWindowSize } from "usehooks-ts";
import SuggestionCard from "../../components/FeedbackCard/FeedbackCard";
import { useAppSelector } from "../../slices/dataSlice";
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
  const borderTopColoringTablet = (item: any) => {
    let value = "suggestion-card-top";
    if (item.status === "planned") return "orange " + value;
    if (item.status === "in-progress") return "purple " + value;
    if (item.status === "live") return "blue " + value;
  };

  // renders correct ::after pseudo element color for mobile
  const afterPseudoElementMobile = (item: { text: string }) => {
    return width < 768 && item.text === currentSelect
      ? `default active ${currentSelect.toLowerCase()}`
      : "default";
  };

  const renderMobileDescription = () => {
    return (
      <div className="array-description">
        {array[0].text} ({array[0].arrayLength})<p>{array[0].description}</p>
      </div>
    );
  };

  const tester = () => {
    return (
      <div className="tester-container">
        {Object.values(options).map((items) => (
          <div className="column">
            {items.item.map((item: any) => (
              <div className={borderTopColoringTablet(item)}>
                <SuggestionCard item={item} page="roadmap" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  tester();

  return (
    <>
      <div className="roadmap-header-wrapper">
        <header className="roadmap-header">
          <Link to="/">
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
      </div>

      <nav className="roadmap-second-header">
        <ul>
          {options.map((item, index) => (
            <li
              key={index}
              className={afterPseudoElementMobile(item)}
              onClick={() => setCurrentSelect(item.text)}
            >
              {item.text} ({item.arrayLength})
              {width > 768 && <p>{item.description}</p>}
            </li>
          ))}
        </ul>
      </nav>

      <main className="roadmap-main">
        {width < 768 && renderMobileDescription()}
        {width < 768 &&
          array[0].item.map((item: any, index: number) => (
            <div className={borderTopColoringTablet(item)}>
              <SuggestionCard key={index} item={item} page="roadmap" />
            </div>
          ))}
        {width > 768 && tester()}
      </main>
    </>
  );
};

export default Roadmap;
