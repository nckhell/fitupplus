//@flow
import React from 'react'
import { InscriptionsPage } from '../pages/groepslessen/inschrijvingen/InscriptionsPage'
import { StatisticsPage } from '../pages/groepslessen/statistieken/StatisticsPage'
import { LessonsPage } from '../pages/groepslessen/lessen/LessonsPage'
import { EditLessonPage } from '../pages/groepslessen/lessen/EditLessonPage'
import { CreateLessonPage } from '../pages/groepslessen/lessen/CreateLessonPage'

import { type RouteType } from './index'

export const groepslessen_routes: Array<RouteType> = [
  {
    path: '/groepslessen/inschrijvingen',
    protected: true,
    page: <InscriptionsPage />
  },
  {
    path: '/groepslessen/statistiek',
    protected: true,
    page: <StatisticsPage />
  },
  {
    path: '/groepslessen/lessen/add',
    protected: true,
    page: <CreateLessonPage />
  },
  {
    path: '/groepslessen/lessen/edit/:id',
    protected: true,
    page: <EditLessonPage />
  },
  {
    path: '/groepslessen/lessen',
    protected: true,
    page: <LessonsPage />
  }
]
