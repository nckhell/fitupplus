import React from 'react'
import * as R from 'ramda'
import {
  BarChart as RechartsBarChart,
  Bar,
  Legend,
  XAxis,
  LabelList,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import {
  chart_colors,
  default_chart_color
} from '../../assets/colors/chart-colors'

export type PropsType = {|
  data: Array<{}>,
  dataKeys: {
    xAxisLabelKey: string,
    yAxisValueKey?: string
  }
|}

export const BarChart = ({ data, dataKeys }: PropsType) => {
  const { xAxisLabelKey, yAxisValueKey } = dataKeys

  if (data) {
    const omitKeys = R.compose(R.map, R.omit)

    const data_points = R.compose(
      R.flatten,
      R.map(R.keys),
      R.take(1),
      omitKeys([xAxisLabelKey])
    )(data)
    console.log(data_points)

    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <RechartsBarChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisLabelKey} />
            <YAxis
              label={{
                value: 'Aantal',
                angle: -90,
                position: 'insideLeft',
                textAnchor: 'middle'
              }}
            />
            <Tooltip />
            {yAxisValueKey && (
              <Bar dataKey={yAxisValueKey} fill={default_chart_color} />
            )}
            {!yAxisValueKey && <Legend verticalAlign="bottom" height={36} />}
            {!yAxisValueKey &&
              data_points.length > 1 &&
              data_points.map((dataKey, key) => {
                return (
                  <Bar
                    key={dataKey}
                    dataKey={dataKey}
                    fill={chart_colors[key]}
                  ></Bar>
                )
              })}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return <p>No data</p>
}
