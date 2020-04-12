//@flow
import React from 'react'
import { TeamOutlined } from '@ant-design/icons'
import { TeamPage } from '../pages/team/TeamPage'

import { type RouteType } from './index'

export const team_routes: Array<RouteType> = [
  {
    path: '/team',
    protected: true,
    icon: <TeamOutlined />,
    menu_item: 'Team',
    exact: true,
    page: <TeamPage />,
    sub_menu: [
      {
        path: '/add',
        exact: true,
        protected: true,
        page: <div />
      },
      {
        path: '/edit/:id',
        exact: true,
        protected: true,
        page: <div />
      }
    ]
  }
]
