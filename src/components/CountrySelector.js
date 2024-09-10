// CountrySelector.js
import React, { Component } from 'react';
import axios from 'axios';

class CountrySelector extends Component {
  state = {
    countries: [],
    selectedCountry: 'USA',
  };

  componentDidMount() {
    this.fetchCountries();
  }

  fetchCountries = async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/countries');
    this.setState({ countries: response.data });
  };

  handleChange = (event) => {
    this.setState({ selectedCountry: event.target.value });
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <div style={{marginBottom:'20px', marginTop:'20px'}}>
        <label htmlFor="country" > Country: </label>
        <select id="country" value={this.state.selectedCountry} onChange={this.handleChange}>
          {this.state.countries.map((country) => (
            <option key={country.country} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default CountrySelector;
