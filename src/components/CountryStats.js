// CountryStats.js
import React from 'react';
import { Descriptions } from 'antd';

const CountryStats = ({ data }) => {
    const { population, cases, deaths, recovered } = data;

    const items = [
        {
            key: '1',
            label: 'Total Cases ',
            children: cases,
        },
        {
            key: '2',
            label: 'Total Recovered',
            children: recovered ,
        },
        {
            key: '3',
            label: 'Total Deaths',
            children: deaths,
        },
        {
            key: '4',
            label: 'Total Population ',
            children: population ,
        }
    ];

    return (

        <Descriptions items={items} bordered/>
    );
};

export default CountryStats;
