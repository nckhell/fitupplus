//@flow
import React from 'react'
import { InscriptionsPage } from '../pages/groepslessen/inschrijvingen/InscriptionsPage'
import { StatisticsPage } from '../pages/groepslessen/statistieken/StatisticsPage'
import { LessonsPage } from '../pages/groepslessen/lessen/LessonsPage'
import { EditLessonPage } from '../pages/groepslessen/lessen/EditLessonPage'
import { CreateLessonPage } from '../pages/groepslessen/lessen/CreateLessonPage'
import { CalendarOutlined } from '@ant-design/icons'

import { type RouteType } from './index'

export const groepslessen_routes: Array<RouteType> = [
  {
    path: '/groepslessen',
    protected: true,
    icon: <CalendarOutlined />,
    menu_item: 'Groepslessen',
    sub_menu: [
      {
        path: '/inschrijvingen',
        exact: true,
        protected: true,
        page: <InscriptionsPage />,
        menu_item: 'Inschrijvingen'
      },
      {
        path: '/lesrooster',
        exact: true,
        protected: true,
        page: <div />,
        menu_item: 'Lesrooster'
      },
      {
        path: '/lessen',
        exact: true,
        protected: true,
        page: <LessonsPage />,
        menu_item: 'Lessen'
      },
      {
        path: '/statistiek',
        exact: true,
        protected: true,
        page: <StatisticsPage />,
        menu_item: 'Statistiek'
      },
      {
        path: '/lessen/add',
        exact: true,
        protected: true,
        page: <CreateLessonPage />
      },
      {
        path: '/lessen/edit/:id',
        exact: true,
        protected: true,
        page: <EditLessonPage />
      }
    ]
  }
]
