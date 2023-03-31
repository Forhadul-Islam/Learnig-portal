import React from "react";

const Option = ({ id, option, handleChecked, onChange }) => {
  return (
    <label htmlFor={id}>
      <input
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        id={id}
        checked={handleChecked()}
      />
      {option}
    </label>
  );
};

export default Option;
