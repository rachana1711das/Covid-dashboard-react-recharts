// GlobalStats.js
import React from 'react';
import { Card, Col, Row } from 'antd';
import DistributionChart from '../components/graphs/DistributionChart';

const GlobalStats = ({ data }) => {
  console.log(data)
  const { cases, deaths, recovered, active, critical, todayCases, todayDeaths } = data;

  return (
    <div>
      <h2>Global COVID-19 Statistics</h2>


      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Cases" bordered={false}>
            {cases}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Deaths" bordered={false}>
            {deaths}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Recovered" bordered={false}>
            {recovered}
          </Card>
        </Col>

      </Row>

      <DistributionChart data={data} />


    </div>
  );
};

export default GlobalStats;
