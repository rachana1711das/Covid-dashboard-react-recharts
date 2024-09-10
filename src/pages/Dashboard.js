// Dashboard.js
import React, { Component } from 'react';
import axios from 'axios';


import CountrySelector from '../components/CountrySelector';
import CountryStats from '../components/CountryStats';
import DailyCasesChart from '../components/graphs/DailyCasesChart';
import DistributionChart from '../components/graphs/DistributionChart';
import HistoricalDataChart from '../components/graphs/HistoricalDataChart';

class Dashboard extends Component {
  state = {
    countryData: {},
    selectedCountry: 'USA',
    error: null,

  };

  componentDidMount() {
    this.fetchCountryData(this.state.selectedCountry);
  }


  fetchCountryData = async (country) => {
    try {
      const response = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);
      this.setState({ countryData: response.data, error: null });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleCountryChange = (country) => {
    this.setState({ selectedCountry: country }, () => {
      this.fetchCountryData(country);
    });
  };

  render() {
    const { countryData, error } = this.state;

    return (
      <>
        <CountrySelector onChange={this.handleCountryChange} />
        <div>
          {error ? (
            <div style={{ color: 'red' }}>
              <p>Error fetching data: {error}</p>
            </div>
          ) : (
            <>
              <CountryStats data={countryData} />
              <h2>Covid-19 Distribution Analysis of {countryData?.country}</h2>
              <DistributionChart data={countryData} />
              <h2>Covid-19 Historical Data of {countryData?.country} </h2>
              <HistoricalDataChart country={this.state.selectedCountry} />
              <h2>Covid-19 Daily Cases of {countryData?.country}</h2>
              <DailyCasesChart country={this.state.selectedCountry} />
            </>
          )}
        </div>
      </>
    );
  }
}

export default Dashboard;
