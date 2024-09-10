import React, { Component } from 'react';
import { HomeOutlined, GlobalOutlined, LineChartOutlined } from '@ant-design/icons';
import axios from 'axios';

import { Breadcrumb, Layout, Menu, Flex } from 'antd';
import DataTable from '../components/DataTable';
import Dashboard from '../pages/Dashboard';
import GlobalStats from '../components/GlobalStats';

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


const items = [
  getItem('Home', 'home', <HomeOutlined />),
  getItem('All Countries', 'global', <GlobalOutlined />),
  getItem('Country-wise Data', 'country', <LineChartOutlined />),
 
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      globalData: {},
      current: 'home',
    };
  }


  componentDidMount() {
    this.fetchGlobalData();
  }

  fetchGlobalData = async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/all');
    this.setState({ globalData: response.data });
  };

  onClick = (e) => {
    console.log('click ', e);
    this.setState({ current: e.key });

  };


  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed,current, globalData } = this.state;
    // const {
    //   token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div style={{color:'white', marginTop:'50px', marginBottom:'50px'}}>Covid Statistics</div>
          <Menu onClick={this.onClick} selectedKeys={[current]} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
           
            {current === 'home' &&  <GlobalStats data={globalData} />}
        {current === 'global' &&   <DataTable />}
        {current === 'country' &&   <Dashboard />}
          </Content>
          
        </Layout>
      </Layout>
    );
  }
}

export default SideBar;
