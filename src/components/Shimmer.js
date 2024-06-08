import React from "react";
import "./Shimmer.css"; 

const Shimmer = ({ count }) => {
  const shimmerWrappers = Array.from({ length: count }, (_, index) => (
    <div className="shimmer-wrapper" key={index}>
      <div className="shimmer"></div>
    </div>
  ));

  return <div className="shimmer-layout">{shimmerWrappers}</div>;
};

export default Shimmer;
