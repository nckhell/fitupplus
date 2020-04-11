//@flow
import React, { type Element } from 'react'
import { NotFoundPage } from '../pages/404/NotFoundPage'
import { groepslessen_routes } from './groepslessen_routes'

export type RouteType = {
  path: string,
  exact?: boolean,
  protected: boolean,
  page: Element<any>
}

export const routes: Array<RouteType> = [
  ...groepslessen_routes,
  {
    path: '*',
    protected: false,
    page: <NotFoundPage />
  }
]
