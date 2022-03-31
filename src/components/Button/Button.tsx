import { useNavigate } from "react-router-dom";
import "./button.scss";
interface Props {
  text: string;
  color: string;
  link: string;
}

const Button = ({ text, color, link }: Props) => {
  let navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(link, { replace: true })}
      style={{ backgroundColor: color }}
      className="feedback-button"
    >
      {text}
    </button>
  );
};

export default Button;
