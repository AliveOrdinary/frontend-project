import React from "react";

const Cards = ({ title, subtitle, icon }) => {
  return (
    <div className="card-container">
      <div className="card-icon">
        <img width="50px" height="50px" src={icon} alt="icon" />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Cards;
