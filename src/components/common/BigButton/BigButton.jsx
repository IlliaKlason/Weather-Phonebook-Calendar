import PropTypes from "prop-types";
import s from "./BigButton.module.css";

const BigButton = ({
  text,
  icon,
  type,
  disabled,

}) => {
  

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={disabled ? s.disabled : s.btn}
    >
      <span className={s.heading}>{text}</span>
    </button>
  );
};

BigButton.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
 
};

export default BigButton;