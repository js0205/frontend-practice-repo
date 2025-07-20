import React from 'react';
import { Layout, Typography, Space } from 'antd';
import CascaderSelector from './components/CascaderSelector';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ 
        padding: '0 24px', 
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
          React 19 + TypeScript + Webpack + Ant Design
        </Title>
      </Header>
      
      <Content style={{ 
        margin: '24px 16px', 
        padding: 24, 
        background: 'transparent'
      }}>
        <CascaderSelector />
      </Content>
    </Layout>
  );
};

export default App; 