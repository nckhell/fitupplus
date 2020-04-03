import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Brush,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Card, Spin, Button, Tooltip as AntdTooltip } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { default_chart_color } from '../../../../assets/colors/chart-colors'
import { api_client } from '../../../../helpers/axios/api_client'

export const MonthlyTotalsChart = () => {
  const [month_totals, set_month_totals] = useState(null)
  const [refresh, set_refresh] = useState(false)
  const [loading, set_loading] = useState(true)

  const refresh_data = () => set_refresh(!refresh)

  const x_axis_data_key = 'label'
  const y_axis_data_key = 'count'
  const default_amount_months_to_show = 8

  useEffect(() => {
    set_loading(true)

    api_client
      .get('/inscriptions/statistics/monthly')
      .then(response => {
        set_month_totals(R.view(R.lensProp('data'), response))
        set_loading(false)
      })
      .catch(err => {
        console.log(err.response)
      })
  }, [refresh])

  return (
    <Card
      title={'Totaal aantal inschrijvingen per maand'}
      extra={[
        <AntdTooltip title="Refresh" placement="bottom" key="1">
          <Button
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
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <RechartsBarChart
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
                <Bar dataKey={y_axis_data_key} fill={default_chart_color} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </Card>
  )
}
