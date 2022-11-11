import React from "react";

const HeaderStyleDropdown = (props) => {
  const onToggle = (e) => {
    let value = e.target.value;
    if (props.onToggle) {
      props.onToggle(value);
    }
  };
  return (
    <select className="p-2 bg-transparent border-transparent outline-none">
      <option value="">Heading level</option>
      {props.headerOptions.map((heading, idx) => {
        return (
          <option key={idx} value={heading.style}>
            {heading.label}
          </option>
        );
      })}
    </select>
  );
};

export default HeaderStyleDropdown;
