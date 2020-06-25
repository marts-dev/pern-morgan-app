import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import "./App.css";
import AppHeader from "./components/AppHeader";
import SearchBar from "./components/SearchBar";
import ResultView from "./components/ResultView";
import About from "./components/About";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      chartData: undefined,
      dbLoaded: false,
    };
  }

  submitQuery = async (observation_date, max_results) => {
    try {
      const res = await axios.get(
        `/top/confirmed?observation_date=${observation_date}&max_results=${max_results}`
      );
      this.setState({ chartData: res.data });
    } catch (err) {
      console.error(err.message);
    }
  };

  startApp = async () => {
    try {
      const res = await axios.post(`/`);
      if (res.status !== 200) throw res;
      this.setState({ dbLoaded: true });
    } catch (err) {
      alert("Server encountered an error, please refresh your browser");
      console.error(err.message);
    }
  };

  stopApp = async () => {
    try {
      const res = await axios.delete(`/stop`);
      if (res.status !== 205) throw res;
      this.setState({ dbLoaded: false });
    } catch (err) {
      alert("Server encountered an error, please refresh your browser");
      console.error(err.message);
    }
  };

  render() {
    let resultsDiv = <React.Fragment></React.Fragment>;
    let searchDiv = (
      <React.Fragment>
        <div className="buttonDiv">
          <button className="stopButton" onClick={this.stopApp}>
            Stop
          </button>
        </div>
        <SearchBar submitQuery={this.submitQuery} />
      </React.Fragment>
    );
    if (this.state.dbLoaded) {
      //Covid data loaded to database
      if (this.state.chartData && this.state.chartData.countries.length !== 0) {
        resultsDiv = <ResultView chartData={this.state.chartData} />;
      } else {
        resultsDiv = (
          <React.Fragment>
            <div className="resultPlaceHolder">No results found</div>
          </React.Fragment>
        );
      }
    } else {
      searchDiv = (
        <React.Fragment>
          <div className="buttonDiv">
            <button className="startButton" onClick={this.startApp}>
              Start
            </button>
          </div>
        </React.Fragment>
      );
    }

    return (
      <Router>
        <div className="App">
          <AppHeader />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <React.Fragment>
                  {searchDiv}
                  {resultsDiv}
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </Router>
    );
  }
}
