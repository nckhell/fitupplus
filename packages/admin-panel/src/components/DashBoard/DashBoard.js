//@flow
import React, { useState } from 'react'
import './DashBoard.css'
import { Layout, Menu } from 'antd'
import { Logo } from '../Logo'
import { Switch, Route, Link } from 'react-router-dom'
import { TopBar } from '../TopBar'
import { NotFoundPage } from '../../pages/404/NotFoundPage'
import { Breadcrumb } from '../Breadcrumb'
import { CalendarOutlined } from '@ant-design/icons'
import { InscriptionsPage } from '../../pages/inscriptions/InscriptionsPage'
import { StatisticsPage } from '../../pages/inscriptions/StatisticsPage'
import { ProtectedRoute } from '../App/ProtectedRoute'

export const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { Sider, Content } = Layout

  const { SubMenu } = Menu
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
          <SubMenu
            key="sub1"
            title={
              <span>
                <CalendarOutlined />
                <span>Groepslessen</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <Link to="/groepslessen/inschrijvingen">
                <span>Inschrijvingen</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/groepslessen/lesrooster">
                <span>Lesrooster</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/groepslessen/lessen">
                <span>Lessen</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/groepslessen/statistiek">
                <span>Statistiek</span>
              </Link>
            </Menu.Item>
          </SubMenu>
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
            <ProtectedRoute path="/groepslessen/inschrijvingen">
              <InscriptionsPage />
            </ProtectedRoute>
            <ProtectedRoute path="/groepslessen/statistiek">
              <StatisticsPage />
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
