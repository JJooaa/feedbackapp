import { useState } from "react";
import GoBackHeader from "../../components/GoBackHeader/GoBackHeader";
import { useAppSelector } from "../../redux/dataSlice";
import "./roadmap.scss";

const Roadmap = () => {
  const data = useAppSelector((state) => state.data.value);
  const [currentSelect, setCurrentSelect] = useState<any>("");

  const planned = data.filter(
    (item: { status?: string }) => item.status === "planned"
  );
  const inProgress = data.filter(
    (item: { status?: string }) => item.status === "in-progress"
  );
  const live = data.filter(
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
            <li
              key={index}
              className={
                currentSelect === item[1].text ? "default active" : "default"
              }
              onClick={() => setCurrentSelect(item[1].text)}
            >
              {item[1].text} ({item[1].number})
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Roadmap;
