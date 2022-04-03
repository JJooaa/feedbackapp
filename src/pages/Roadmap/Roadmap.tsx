import { useState } from "react";
import GoBackHeader from "../../components/GoBackHeader/GoBackHeader";
import data from "../../data.json";
import "./roadmap.scss";

const filteredData = data.productRequests;

const Roadmap = () => {
  const [currentSelect, setCurrentSelect] = useState("");

  const planned = filteredData.filter(
    (item: { status?: string }) => item.status === "planned"
  );
  const inProgress = filteredData.filter(
    (item: { status?: string }) => item.status === "in-progress"
  );
  const live = filteredData.filter(
    (item: { status?: string }) => item.status === "live"
  );

  console.log(currentSelect);
  const options = [
    {
      text: "Planned",
      number: planned.length,
    },
    {
      text: "In-Progess",
      number: inProgress.length,
    },
    {
      text: "Live",
      number: live.length,
    },
  ];

  return (
    <>
      <GoBackHeader page="roadmap" />
      <nav className="roadmap-nav">
        <ul>
          {Object.entries(options).map((item, index) => (
            <li key={index} onClick={() => setCurrentSelect(item[1].text)}>
              {item[1].text} ({item[1].number})
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Roadmap;
