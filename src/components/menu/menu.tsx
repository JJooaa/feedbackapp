import React from "react";
import "./menu.scss";
import { Link } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { useAppSelector } from "../../slices/dataSlice";

const features: Array<string> = [
  "All",
  "UI",
  "UX",
  "Enhancement",
  "Bug",
  "Feature",
];

interface Props {
  setCurrentCategory: (value: string) => void;
  currentCategory: string;
}

// Either hamburger menu / tablet header or desktop header /
const Menu: React.FC<Props> = ({ setCurrentCategory, currentCategory }) => {
  const data = useAppSelector((state) => state.data.value);

  const { width } = useWindowSize();

  // planned suggestions array
  const planned = data.filter(
    (item: { status?: string }) => item.status === "planned"
  );
  // inprogress suggestions array
  const inProgress = data.filter(
    (item: { status?: string }) => item.status === "in-progress"
  );
  // live suggestions array
  const live = data.filter(
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
            <li
              style={
                currentCategory === item
                  ? { backgroundColor: "#4661E6", color: "white" }
                  : undefined
              }
              onClick={() => setCurrentCategory(item)}
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="roadmap">
          <div className="link-wrapper">
            <h1>Roadmap</h1>
            <Link to="/roadmap">View</Link>
          </div>

          <ul className="roadmap-status">
            <li>
              <span className="dot orange-d"></span>
              Planned
              <span className="status-number">{planned.length}</span>
            </li>
            <li>
              <span className="dot purple-d"></span>
              In-progress
              <span className="status-number">{inProgress.length}</span>
            </li>
            <li>
              <span className="dot blue-d"></span>
              Live
              <span className="status-number">{live.length}</span>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
