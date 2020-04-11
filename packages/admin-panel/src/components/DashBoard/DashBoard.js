//@flow
import React, { useState } from 'react'
import './DashBoard.css'
import { Layout, Menu } from 'antd'
import { Logo } from '../Logo'
import { Switch, Route, Link } from 'react-router-dom'
import { TopBar } from '../TopBar'
import { Breadcrumb } from '../Breadcrumb'
import { CalendarOutlined } from '@ant-design/icons'
import { ProtectedRoute } from '../App/ProtectedRoute'
import { useBreadcrumb } from '../../contexts/breadcrumb-context'
import { routes } from '../../routes'

export const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { Sider, Content } = Layout
  const breadcrumb = useBreadcrumb()

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
            key="groepslessen"
            title={
              <span>
                <CalendarOutlined />
                <span>Groepslessen</span>
              </span>
            }
          >
            <Menu.Item key="inschrijvingen">
              <Link to="/groepslessen/inschrijvingen">
                <span>Inschrijvingen</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="lesrooster">
              <Link to="/groepslessen/lesrooster">
                <span>Lesrooster</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="lessen">
              <Link to="/groepslessen/lessen">
                <span>Lessen</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="statistiek">
              <Link to="/groepslessen/statistiek">
                <span>Statistiek</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <TopBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <Breadcrumb items={breadcrumb.items.get} />
        <Content
          style={{
            margin: '24px 16px'
          }}
        >
          <Switch>
            {routes.map((route, index) => {
              if (route.protected) {
                return (
                  <ProtectedRoute
                    key={index}
                    path={route.path}
                    exact={route.exact}
                  >
                    {route.page}
                  </ProtectedRoute>
                )
              }
              return (
                <Route key={index} path={route.path} exact={route.exact}>
                  {route.page}
                </Route>
              )
            })}
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}
