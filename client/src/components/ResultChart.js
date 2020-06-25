import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";

export default class ResultChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      chartOptions: {
        title: {},
        maintainAspectRatio: false,
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
          duration: 2000,
          easing: "easeInOutQuad",
        },
      },
    };
  }

  componentDidMount() {
    console.log("mounted");
    this.prepareDataForChart();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("check chart");
    console.log(prevProps.chartData);
    console.log(prevState.chartData);
    if (prevProps.chartData !== prevState.chartData) {
      console.log("updated chart");
      console.log(prevState.chartData);
      this.prepareDataForChart();
    }
  }

  prepareDataForChart() {
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
    this.setState({
      chartOptions: {
        title: {
          display: true,
          text: today.toLocaleDateString("en-US", options),
        },
      },
      chartData: chartData,
    });
  }
  render() {
    return (
      <div className="chart" style={chartStyle}>
        <HorizontalBar
          data={this.state.chartData}
          height={500}
          options={this.state.chartOptions}
        />
      </div>
    );
  }
}

const chartStyle = {
  color: "1c1c1c",
};
