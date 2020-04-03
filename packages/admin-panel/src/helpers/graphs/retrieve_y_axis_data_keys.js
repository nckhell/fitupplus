import * as R from 'ramda'

type ParamsType = {
  data: Array<{}>,
  x_axis_label_key: string
}

export const retrieve_y_axis_data_keys = ({
  data,
  x_axis_label_key
}: ParamsType) => {
  const omitKeys = R.compose(R.map, R.omit)

  return R.compose(
    R.flatten,
    R.map(R.keys),
    R.take(1),
    omitKeys([x_axis_label_key])
  )(data)
}
