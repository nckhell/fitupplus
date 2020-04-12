//@flow
import React, { useState } from 'react'
import * as R from 'ramda'
import './DashBoard.css'
import { Layout } from 'antd'
import { Logo } from '../Logo'
import { Switch, Route } from 'react-router-dom'
import { TopBar } from '../TopBar'
import { Breadcrumb } from '../Breadcrumb'
import { ProtectedRoute } from '../App/ProtectedRoute'
import { NotFoundPage } from '../../pages/404/NotFoundPage'
import { useBreadcrumb } from '../../contexts/breadcrumb-context'
import { routes, type RouteType } from '../../routes'
import { Menu } from '../Menu'
import {
  pageLens,
  protectedLens,
  exactLens,
  pathLens,
  subMenuLens
} from '../../api/routes/lenses'

export const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { Sider, Content } = Layout
  const breadcrumb = useBreadcrumb()

  const toggleCollapsed = () => setCollapsed(!collapsed)

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo collapsed={collapsed} />
        <Menu routes={routes} />
      </Sider>
      <Layout className="site-layout">
        <TopBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <Breadcrumb items={breadcrumb.items.get} />
        <Content
          style={{
            margin: '24px 16px'
          }}
        >
          <PageRoutes routes={routes} />
        </Content>
      </Layout>
    </Layout>
  )
}

export type PropsType = {|
  routes: Array<RouteType>
|}

export const PageRoutes = ({ routes }: PropsType) => {
  return (
    <Switch>
      {routes.map(route => {
        const page = R.view(pageLens, route)
        const path = R.view(pathLens, route)
        const exact = R.view(exactLens, route)
        const is_protected = R.view(protectedLens, route)

        if (page) {
          if (is_protected) {
            return (
              <ProtectedRoute key={path} path={path} exact={exact}>
                {page}
              </ProtectedRoute>
            )
          }
          return (
            <Route key={path} path={path} exact={exact}>
              {page}
            </Route>
          )
        }
      })}
      {routes.map(route => {
        const sub_menu = R.view(subMenuLens, route)

        if (sub_menu) {
          return sub_menu.map(sub_route => {
            const page = R.view(pageLens, sub_route)
            const path = `${R.view(pathLens, route)}${R.view(
              pathLens,
              sub_route
            )}`
            const exact = R.view(exactLens, sub_route)
            const is_protected = R.view(protectedLens, sub_route)

            if (page) {
              if (is_protected) {
                return (
                  <ProtectedRoute key={path} path={path} exact={exact}>
                    {page}
                  </ProtectedRoute>
                )
              }
              return (
                <Route key={path} path={path} exact={exact}>
                  {page}
                </Route>
              )
            }
          })
        }
        return null
      })}
      <Route key="404" path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  )
}
