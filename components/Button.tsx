import React from "react";

type ButtonProps = {
  handleClick: () => void;
  text?: string;
};

export const Button = ({ handleClick, text }: ButtonProps) => {
  return (
    <button style={{ width: "100%", height: "24px" }} onClick={handleClick}>
      {text || "click me"}
    </button>
  );
};
