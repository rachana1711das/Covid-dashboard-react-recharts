// DailyCasesChart.js
import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

class DailyCasesChart extends Component {
  state = {
    dailyData: [],
  };

  componentDidMount() {
    this.fetchDailyData(this.props.country);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.country !== this.props.country) {
      this.fetchDailyData(this.props.country);
    }
  }

  fetchDailyData = async (country) => {
    const response = await axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`);
    const timeline = response.data.timeline;
    const dailyData = Object.keys(timeline.cases).map(date => ({
      date,
      cases: timeline.cases[date],
      deaths: timeline.deaths[date],
      recovered: timeline.recovered[date],
    }));
    this.setState({ dailyData });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={this.state.dailyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cases" stroke="#8884d8" />
          <Line type="monotone" dataKey="deaths" stroke="#FF0000" />
          <Line type="monotone" dataKey="recovered" stroke="#00FF00" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default DailyCasesChart;
