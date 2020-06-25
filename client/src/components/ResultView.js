import React, { Component } from "react";
import ResultList from "./ResultList";
import PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";

export default class ResultView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
    };
  }
  componentDidUpdate() {
    this.setState({
      chartData: this.props.chartData,
    });
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.chartData !== this.state.chartData;
  }

  prepareDataForChart = () => {
    const labels = [];
    const confirmed = [],
      deaths = [],
      recovered = [];
    this.state.chartData.countries.forEach((element) => {
      labels.push(element.country);
      confirmed.push(element.confirmed);
      deaths.push(element.deaths);
      recovered.push(element.recovered);
    });
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Confirmed Cases",
          data: confirmed,
          backgroundColor: "#24327a",
          hoverBackgroundColor: "rgb(0, 149, 255)",
        },
        {
          label: "Deaths",
          data: deaths,
          backgroundColor: "rgb(24, 34, 56)",
          hoverBackgroundColor: "rgb(0, 149, 255)",
        },
        {
          label: "Recovered",
          data: recovered,
          backgroundColor: "rgb(135, 145, 163)",
          hoverBackgroundColor: "rgb(0, 149, 255)",
        },
      ],
    };
    const today = new Date(this.state.chartData.observation_date);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const tempChartConfig = {
      chartData: chartData,
      chartOptions: {
        title: {
          display: true,
          text: today.toLocaleDateString("en-US", options),
        },
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          labels: {
            fontColor: "#1c1c1c",
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                fontColor: "#1c1c1c",
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                fontColor: "#1c1c1c",
              },
            },
          ],
        },
        animation: {
          duration: 1000,
          easing: "easeInOutQuad",
        },
      },
    };
    return tempChartConfig;
  };

  render() {
    let chartConfig = this.prepareDataForChart();
    return (
      <div id="resultView" className="resultView">
        <div style={resultCards}>
          <ResultList observations={this.state.chartData.countries} />
        </div>
        <React.Fragment>
          <HorizontalBar
            data={chartConfig.chartData}
            options={chartConfig.chartOptions}
          />
        </React.Fragment>
      </div>
    );
  }
}

ResultView.propTypes = {
  chartData: PropTypes.object.isRequired,
};

const resultCards = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  fontSize: "2rem",
};
