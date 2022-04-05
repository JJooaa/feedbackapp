import { current } from "@reduxjs/toolkit";
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
  // on mobile if currentSelect is options.text render options.item
  const array = options.filter((item: any) => item.text === currentSelect);

  const renderCurrentSelectCards = () => {
    return array[0].item.map((item: any, index: number) => (
      <SuggestionCard key={index} item={item} />
    ));
  };

  console.log(array);

  return (
    <>
      <GoBackHeader page="roadmap" />
      <nav className="roadmap-nav">
        <ul>
          {options.map((item, index) => (
            <li
              key={index}
              className={
                currentSelect === item.text && width < 700
                  ? "default active"
                  : width > 700
                  ? "default large"
                  : "default"
              }
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
          {array.map(
            (item) =>
              item.text === currentSelect && (
                <div className="current-select">
                  {item.text} ({item.number})<p>{item.description}</p>
                </div>
              )
          )}
        </div>
        {renderCurrentSelectCards()}
      </main>
    </>
  );
};

export default Roadmap;
