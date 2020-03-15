//@flow
import React, { useState } from 'react'
import './DashBoard.css'
import { Layout, Menu } from 'antd'
import { Logo } from '../Logo'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { TopBar } from '../TopBar'
import { Breadcrumb } from '../Breadcrumb'
import { FormOutlined } from '@ant-design/icons'
import { is_authenticated } from '../../helpers/auth/is_authenticated'
import { InscriptionsPage } from '../../pages/InscriptionsPage'

export const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { Sider, Content } = Layout

  const toggleCollapsed = () => setCollapsed(!collapsed)

  if (is_authenticated()) {
    return (
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Logo collapsed={collapsed} />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            className="nav"
          >
            <Menu.Item key="1">
              <FormOutlined />
              <Link to="/inschrijvingen">
                <span>Inschrijvingen</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <TopBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
          <Breadcrumb
            items={[{ name: 'Inschrijvingen', partial_url: 'inschrijvingen' }]}
          />
          <Content
            style={{
              margin: '24px 16px'
            }}
          >
            test
            <Switch>
              <Route path="/inschrijvingen" component={InscriptionsPage} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
  return <Redirect to="/login" />
}
