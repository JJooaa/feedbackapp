import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import GoBackHeader from "../../components/GoBackHeader/GoBackHeader";
import SuggestionCard from "../../components/SuggestionCard/SuggestionCard";
import { useAppSelector } from "../../redux/dataSlice";
import "./roadmap.scss";

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

  const options = [
    {
      text: "Planned",
      number: planned.length,
      description: "Ideas prioritized for research",
      item: planned,
    },
    {
      text: "In-Progress",
      number: inProgress.length,
      description: "Currently being developed",
      item: inProgress,
    },
    {
      text: "Live",
      number: live.length,
      description: "Released features",
      item: live,
    },
  ];
  // returns the current items in relation to currently selected option
  const array = options.filter((item) => item.text === currentSelect);

  // renders border top color based on currentOption eg. Planned -> orange
  const borderTopColoring = (item: { status?: string }) => {
    let value = "suggestion-card-top";
    if (item.status === "planned") return "orange " + value;
    if (item.status === "in-progress") return "purple " + value;
    if (item.status === "live") return "blue " + value;
  };

  const renderCurrentSelectCards = () => {
    return array[0].item.map((item: any, index: number) => (
      <div className={borderTopColoring(item)}>
        <SuggestionCard key={index} item={item} page="roadmap" />
      </div>
    ));
  };

  // renders correct ::after pseudo element color based on currentOption
  const afterPseudoElement = (item: { text: string }) => {
    if (width < 700 && item.text === currentSelect) {
      return `default active ${currentSelect.toLowerCase()}`;
    }
    if (width > 700) {
      return "default large";
    } else {
      return "default";
    }
  };

  return (
    <>
      <GoBackHeader page="roadmap" />
      <nav className="roadmap-nav">
        <ul>
          {options.map((item, index) => (
            <li
              key={index}
              className={afterPseudoElement(item)}
              onClick={() => setCurrentSelect(item.text)}
            >
              {item.text} ({item.number})
              {width > 700 && <p>{item.description}</p>}
            </li>
          ))}
        </ul>
      </nav>
      <main className="main">
        <div>
          {array.map((item) => (
            <div className="current-select">
              {item.text} ({item.number})<p>{item.description}</p>
            </div>
          ))}
        </div>
        {renderCurrentSelectCards()}
      </main>
    </>
  );
};

export default Roadmap;
