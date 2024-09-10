// HistoricalDataChart.js
import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

class HistoricalDataChart extends Component {
  state = {
    historicalData: [],
  };

  componentDidMount() {
    this.fetchHistoricalData(this.props.country);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.country !== this.props.country) {
      this.fetchHistoricalData(this.props.country);
    }
  }

  fetchHistoricalData = async (country) => {
    const response = await axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`);
    const timeline = response.data.timeline;
    const historicalData = Object.keys(timeline.cases).map(date => ({
      date,
      cases: timeline.cases[date],
      deaths: timeline.deaths[date],
      recovered: timeline.recovered[date],
    }));
    this.setState({ historicalData });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={this.state.historicalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="cases" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="deaths" stroke="#FF0000" fill="#FF0000" />
          <Area type="monotone" dataKey="recovered" stroke="#00FF00" fill="#00FF00" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default HistoricalDataChart;
