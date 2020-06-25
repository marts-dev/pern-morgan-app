import React, { Component } from "react";

export default class SearchBar extends Component {
  state = {
    observation_date: "",
    max_results: "",
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitQuery(this.state.observation_date, this.state.max_results);
    document.getElementById("searchForm").reset();
    this.setState({
      observation_date: "",
      max_results: "",
    });
  };
  render() {
    return (
      <div className="searchDiv" style={searchBox}>
        <form id="searchForm" style={formBox} onSubmit={this.handleSubmit}>
          <label style={labelStyle}>Observation Date</label>
          <input
            style={inputStyle}
            type="date"
            name="observation_date"
            onChange={this.onChange}
            required
          ></input>

          <input
            style={inputStyle}
            type="number"
            name="max_results"
            min="1"
            max="100"
            onChange={this.onChange}
            placeholder="Number of result"
            required
          ></input>
          <input style={inputStyle} type="submit"></input>
        </form>
      </div>
    );
  }
}

const searchBox = {
  padding: "5rem 0",
  display: "flex",
  justifyContent: "center",
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const labelStyle = {
  fontSize: "2.3rem",
  margin: "0.5rem",
  fontWeight: "bold",
};

const inputStyle = {
  borderRadius: "10px",
  border: "1px solid",
  fontSize: "2rem",
  margin: "1rem",
  padding: "0.5rem 1rem",
  width: "20rem",
};
