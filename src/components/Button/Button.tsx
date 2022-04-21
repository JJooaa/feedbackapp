import { useNavigate } from "react-router-dom";
import "./button.scss";

interface Props {
  text: string;
  color: string;
  link: string;
  type?: string;
  handleDelete?: () => void;
}

const Button = ({ text, color, link, type, handleDelete }: Props) => {
  let navigate = useNavigate();

  return (
    <button
      type={type === "submit" ? "submit" : undefined}
      onClick={() => {
        navigate(link, { replace: true });
        handleDelete && handleDelete();
      }}
      style={{ backgroundColor: color }}
      className="feedback-button"
    >
      {text}
    </button>
  );
};

export default Button;
