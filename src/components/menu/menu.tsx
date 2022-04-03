import React from "react";
import "./menu.scss";
import { Link } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";

interface Props {
  filteredData: {}[];
}

const features: Array<string> = [
  "All",
  "UI",
  "UX",
  "Enchancement",
  "Bug",
  "Feature",
];

const Menu: React.FC<Props> = ({ filteredData }) => {
  const { width } = useWindowSize();

  const planned = filteredData.filter(
    (item: { status?: string }) => item.status === "planned"
  );
  const inProgress = filteredData.filter(
    (item: { status?: string }) => item.status === "in-progress"
  );
  const live = filteredData.filter(
    (item: { status?: string }) => item.status === "live"
  );

  return (
    <div className="wrapper">
      <nav>
        {width > 700 && (
          <div className="tablet-logo">
            <h1>Frontend Mentor</h1>
            <h2>Feedback Board</h2>
          </div>
        )}

        <ul className="features-ul">
          {features.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="roadmap">
          <div className="link-wrapper">
            <h1>Roadmap</h1>
            <Link to="/roadmap">View</Link>
          </div>
          <ul className="roadmap-status">
            <li>
              Planned<span>{planned.length}</span>
            </li>
            <li>
              In-progress<span>{inProgress.length}</span>
            </li>
            <li>
              Live<span>{live.length}</span>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
