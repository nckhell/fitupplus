//@flow
import * as R from 'ramda'
import { slugify } from '../strings'

type ParamsType = {
  data: Array<{}>,
  group_by: string,
  label_field: string,
  data_field: string
}

export const transform_to_recharts_format = ({
  data,
  group_by,
  label_field,
  data_field
}: ParamsType) => {
  if (R.isNil(data) || R.isEmpty(data)) {
    return [{}]
  }

  return R.compose(
    R.map(item => {
      const obj = {}

      const results = R.filter(
        R.where({ label: R.equals(R.view(R.lensProp(group_by), item)) }),
        data
      )
      R.map(result => {
        obj[slugify(R.view(R.lensProp(label_field), result))] = R.view(
          R.lensProp(data_field),
          result
        )
      }, results)
      return { ...item, ...obj }
    }),
    R.map(item => ({ label: item })),
    wip_data => [
      ...new Set(wip_data.map(item => R.view(R.lensProp(group_by), item)))
    ]
  )(data)
}
