import React, { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => Promise<void>;
}

const Button = (props: Props) => {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  );
};

export default Button;
