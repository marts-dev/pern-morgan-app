import React, { useState, useEffect } from "react";
import ResultListItem from "./ResultListItem";

const ResultList = (props) => {
  const [observations, setObservations] = useState([]);
  async function getObservations() {
    setObservations(props.observations);
  }
  useEffect(() => {
    getObservations();
  });
  return observations.map((observation) => {
    const { country, confirmed, deaths, recovered } = observation;
    return (
      <ResultListItem
        key={observation.country}
        country={country}
        confirmed={confirmed}
        deaths={deaths}
        recovered={recovered}
      />
    );
  });
};

/*ResultList.defaultProps = {
  observations: [],
};

ResultList.propTypes = {
  observations: PropTypes.array.isRequired,
};*/

export default ResultList;
