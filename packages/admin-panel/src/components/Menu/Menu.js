//@flow
import React from 'react'
import * as R from 'ramda'
import { Menu as AntdMenu } from 'antd'
import { Switch, Route, Link } from 'react-router-dom'
import {
  menuItemLens,
  pathLens,
  subMenuLens,
  iconLens
} from '../../api/routes/lenses'
import { type RouteType } from '../../routes'
import { has_sub_menu_items_to_show } from '../../helpers/menu'

export type PropsType = {|
  routes: Array<RouteType>
|}

export const Menu = ({ routes }: PropsType) => {
  const { SubMenu } = AntdMenu

  return (
    <AntdMenu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      className="nav"
    >
      {routes.map(route => {
        const sub_menu = R.view(subMenuLens, route)
        const path = R.view(pathLens, route)
        const menu_item = R.view(menuItemLens, route)
        const icon = R.view(iconLens, route)

        if (has_sub_menu_items_to_show(sub_menu) && menu_item) {
          return (
            <SubMenu
              key={path}
              title={
                <span>
                  {icon ? icon : null}
                  <span>{menu_item}</span>
                </span>
              }
            >
              {sub_menu.map(sub_item => {
                const sub_menu_item = R.view(menuItemLens, sub_item)
                const sub_menu_path = R.view(pathLens, sub_item)

                if (sub_menu_item) {
                  return (
                    <AntdMenu.Item key={sub_menu_path}>
                      <Link to={`${path}${sub_menu_path}`}>
                        <span>{sub_menu_item}</span>
                      </Link>
                    </AntdMenu.Item>
                  )
                }
                return null
              })}
            </SubMenu>
          )
        }
        if (menu_item) {
          return (
            <AntdMenu.Item key={path}>
              <Link to={path}>
                {icon ? icon : null}
                <span>{menu_item}</span>
              </Link>
            </AntdMenu.Item>
          )
        }
      })}
    </AntdMenu>
  )
}
