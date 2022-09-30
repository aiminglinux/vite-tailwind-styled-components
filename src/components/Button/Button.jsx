import React, { Children } from "react";

function Button({ children, primary = false, text = false, full = false }) {
  return (
    <button className="inline-flex justify-center rounded-md border border-solid border-transparent font-bold min-w-full">
      {children}
    </button>
  );
}

export default Button;
