//@flow
import React, { type Element } from 'react'
import { groepslessen_routes } from './groepslessen_routes'
import { team_routes } from './team_routes'
import { page_routes } from './page_routes'
import { news_routes } from './news_routes'
import { FieldTimeOutlined } from '@ant-design/icons'

export type RouteType = {
  path: string,
  exact?: boolean,
  protected: boolean,
  page?: Element<any>,
  sub_menu?: Array<RouteType>,
  icon?: Element<any>,
  menu_item?: string
}

export const routes: Array<RouteType> = [
  ...groepslessen_routes,
  ...team_routes,
  ...page_routes,
  ...news_routes,
  {
    path: '/openingsuren',
    protected: true,
    icon: <FieldTimeOutlined />,
    exact: true,
    menu_item: 'Openingsuren',
    page: <div />
  }
]
