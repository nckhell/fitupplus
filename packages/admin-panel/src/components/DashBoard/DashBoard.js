//@flow
import React, { useState } from 'react'
import './DashBoard.css'
import { Layout, Menu } from 'antd'
import { Logo } from '../Logo'
import { Switch, Route, Link } from 'react-router-dom'
import { TopBar } from '../TopBar'
import { NotFoundPage } from '../../pages/404/NotFoundPage'
import { Breadcrumb } from '../Breadcrumb'
import { FormOutlined } from '@ant-design/icons'
import { InscriptionsPage } from '../../pages/inscriptions'
import { ProtectedRoute } from '../App/ProtectedRoute'

export const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { Sider, Content } = Layout

  const toggleCollapsed = () => setCollapsed(!collapsed)

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
          <Switch>
            <ProtectedRoute path="/inschrijvingen">
              <InscriptionsPage />
            </ProtectedRoute>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}
