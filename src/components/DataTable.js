// DataTable.js
import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'antd';

class DataTable extends Component {
  state = {
    countryStats: [],
    columns: [
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'Total Cases',
        dataIndex: 'cases',
        key: 'cases',
      },
      {
        title: 'Total Deaths',
        dataIndex: 'deaths',
        key: 'deaths',
      },
      {
        title: 'Total Recovered',
        dataIndex: 'recovered',
        key: 'recovered',
      },
      {
        title: 'Active Cases',
        dataIndex: 'active',
        key: 'active',
      },
    ],
  };

  componentDidMount() {
    this.fetchCountryStats();
  }

  fetchCountryStats = async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/countries');
    const countryStats = response.data.map((country, index) => ({
      ...country,
      key: index,
    }));
    this.setState({ countryStats });
  };

  render() {
    const { countryStats, columns } = this.state;
    return <Table columns={columns} dataSource={countryStats} />;
  }
}

export default DataTable;
