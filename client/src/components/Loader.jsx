import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-content-center p-2">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
