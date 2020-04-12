//@flow
import * as R from 'ramda'
import { type RouteType } from '../../routes'

export const has_sub_menu_items_to_show = (
  sub_menu: Array<RouteType>
): boolean => {
  if (sub_menu) {
    return R.compose(
      R.length,
      R.filter(sub_menu_item => R.hasPath(['menu_item'], sub_menu_item))
    )(sub_menu)
  }
  return false
}
