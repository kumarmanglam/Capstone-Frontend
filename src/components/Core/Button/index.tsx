import React from "react";
import "./button.css";
type Button = {
  label: String;
  handleClick: () => void;
};

const Button = ({ label, handleClick }: Button) => {
  return (
    <button className="mybtn" onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
