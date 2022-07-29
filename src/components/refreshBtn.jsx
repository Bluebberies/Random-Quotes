import React from "react";

const RefreshBtn = ({handleRefresh}) => {
  return (
    <button onClick={handleRefresh}>
      <span>random</span> <i className="fa-solid fa-rotate"></i>
    </button>
  );
};

export default RefreshBtn;
