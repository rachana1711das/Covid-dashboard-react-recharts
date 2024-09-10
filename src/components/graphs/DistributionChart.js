// DistributionChart.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const DistributionChart = ({ data }) => {
  const { active, recovered, deaths } = data;
  const chartData = [
    { name: 'Active', value: active },
    { name: 'Recovered', value: recovered },
    { name: 'Deaths', value: deaths },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

  return (
    <div style={{alignItems:'center',display:'flex', justifyContent:'center'}}>
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    </div>
  );
};

export default DistributionChart;
