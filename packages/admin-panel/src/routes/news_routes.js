//@flow
import React from 'react'
import { ReadOutlined } from '@ant-design/icons'

import { type RouteType } from './index'

export const news_routes: Array<RouteType> = [
  {
    path: '/news',
    protected: true,
    icon: <ReadOutlined />,
    exact: true,
    menu_item: 'Nieuws',
    page: <div />,
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
