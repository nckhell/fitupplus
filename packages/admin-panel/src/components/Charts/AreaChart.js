import React from 'react'
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export type PropsType = {|
  data: Array<{}>,
  dataKeys: {
    xAxisLabel: string,
    yAxisDataPoints: Array<string>
  }
|}

export const AreaChart = ({ data, dataKeys }: PropsType) => {
  const { xAxisLabel, yAxisDataPoints } = dataKeys
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <RechartsAreaChart
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
          <XAxis dataKey={xAxisLabel} />
          <YAxis />
          <Tooltip />
          {yAxisDataPoints.map(key => {
            return (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke="#8884d8"
                fill="#8884d8"
              />
            )
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}
