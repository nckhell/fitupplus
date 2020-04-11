import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Brush,
  Legend,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Card, Select, Spin, Button, Tooltip as AntdTooltip } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import {
  chart_colors,
  default_chart_color
} from '../../../../assets/colors/chart-colors'
import { api_client } from '../../../../helpers/axios/api_client'
import {
  transform_to_recharts_format,
  retrieve_y_axis_data_keys
} from '../../../../helpers/graphs'

export const MonthlyTotalByLessonsChart = () => {
  const [month_totals, set_month_totals] = useState(null)
  const [lessons, set_lessons] = useState([])
  const [filtered_lessons, set_filtered_lessons] = useState([])
  const [refresh, set_refresh] = useState(false)
  const [loading, set_loading] = useState(true)

  const refresh_data = () => set_refresh(!refresh)

  const x_axis_data_key = 'label'
  const default_amount_months_to_show = 8

  useEffect(() => {
    set_loading(true)

    api_client
      .get('/inscriptions/statistics/inscriptions_by_lessons')
      .then(response => {
        const wip_month_totals = transform_to_recharts_format({
          data: R.view(R.lensProp('data'), response),
          group_by: 'label',
          label_field: 'lesson',
          data_field: 'count'
        })

        set_month_totals(wip_month_totals)
        set_lessons(
          retrieve_y_axis_data_keys({
            data: wip_month_totals,
            x_axis_label_key: 'label'
          })
        )
        set_filtered_lessons(
          retrieve_y_axis_data_keys({
            data: wip_month_totals,
            x_axis_label_key: 'label'
          })
        )
        set_loading(false)
      })
      .catch(err => {
        console.log(err.response)
      })
  }, [refresh])

  const { Option } = Select

  return (
    <Card
      title={'Aantal inschrijvingen per groepsles per maand'}
      extra={[
        <AntdTooltip title="Refresh" placement="bottom" key="1">
          <Button
            key="1"
            type="primary"
            style={{ marginRight: '12px' }}
            icon={<SyncOutlined />}
            shape="round"
            onClick={() => {
              refresh_data()
            }}
          />
        </AntdTooltip>
      ]}
      bordered={false}
    >
      {loading && (
        <div className="loading" style={{ paddingTop: '12px' }}>
          <Spin />
        </div>
      )}
      {!loading && (
        <div>
          <Select
            key="2"
            placeholder="Selecteer lessen"
            style={{ width: '100%' }}
            mode="multiple"
            value={filtered_lessons}
            onChange={values => set_filtered_lessons(values)}
          >
            {lessons.map(lesson => (
              <Option key={lesson}>{lesson}</Option>
            ))}
          </Select>
          <br />
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <RechartsLineChart
                width={500}
                height={400}
                data={month_totals}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={x_axis_data_key} />
                <YAxis
                  label={{
                    value: 'Aantal',
                    angle: -90,
                    position: 'insideLeft',
                    textAnchor: 'middle'
                  }}
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                {filtered_lessons.map((dataKey, key) => {
                  return (
                    <Line
                      key={dataKey}
                      dataKey={dataKey}
                      stroke={chart_colors[key]}
                      strokeWidth={2}
                    ></Line>
                  )
                })}
                <Brush
                  dataKey={x_axis_data_key}
                  height={30}
                  stroke={default_chart_color}
                  startIndex={
                    month_totals
                      ? month_totals.length - default_amount_months_to_show
                      : 0
                  }
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </Card>
  )
}
