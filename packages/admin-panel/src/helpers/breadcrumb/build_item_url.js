// @flow strict

import { type BreadcrumbItemType } from '../../components/Breadcrumb'

export const build_item_url = (
  items: Array<BreadcrumbItemType>,
  index: number
): string => {
  return items
    .slice(0, index + 1)
    .map(({ partial_url }) => partial_url)
    .join('/')
}
