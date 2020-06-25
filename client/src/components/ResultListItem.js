import React from "react";

const ResultListItem = (props) => {
  return (
    <div className="resultItem" style={resultCard}>
      <h3>{props.country}</h3>
      <p>Confirmed: {props.confirmed}</p>
      <p>Deaths: {props.deaths}</p>
      <p>Recovered: {props.recovered}</p>
    </div>
  );
};

const resultCard = {
  backgroundColor: "#24327a",
  color: "#f5f5f5",
  flex: "0 0 20rem",
  margin: "2rem",
  padding: "2rem",
  borderRadius: "10%",
  transition: "all 0.3s ease-in-out",
};

export default ResultListItem;
