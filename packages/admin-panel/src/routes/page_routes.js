//@flow
import React from 'react'
import { FileTextOutlined } from '@ant-design/icons'

import { type RouteType } from './index'

export const page_routes: Array<RouteType> = [
  {
    path: '/paginas',
    protected: true,
    icon: <FileTextOutlined />,
    menu_item: "Pagina's",
    exact: true,
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
