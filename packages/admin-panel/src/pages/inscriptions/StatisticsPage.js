import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import { Card, Spin, Button, Tooltip } from 'antd'
import { api_client } from '../../helpers/axios/api_client'
import { SyncOutlined } from '@ant-design/icons'
import axios from 'axios'
import { AreaChart } from '../../components/Charts/AreaChart'
import { BarChart } from '../../components/Charts/BarChart'
import { slugify } from '../../helpers/strings'

export const StatisticsPage = () => {
  const [month_totals, set_month_totals] = useState(null)
  const [data_graph_2, set_data_graph_2] = useState(null)
  const [data_graph_3, set_data_graph_3] = useState(null)
  const [loading, set_loading] = useState(true)
  const [refresh, set_refresh] = useState(false)

  const refresh_data = () => set_refresh(!refresh)

  useEffect(() => {
    set_loading(true)

    const request_one = api_client.get('/inscriptions/statistics/monthly')
    const request_two = api_client.get(
      '/inscriptions/statistics/inscriptions_by_roster'
    )
    const request_three = api_client.get(
      '/inscriptions/statistics/inscriptions_by_lessons'
    )

    axios
      .all([request_one, request_two, request_three])
      .then(
        axios.spread((...responses) => {
          set_loading(false)
          set_month_totals(R.view(R.lensProp('data'), responses[0]))
          set_data_graph_2(R.view(R.lensProp('data'), responses[1]))
          set_data_graph_3(R.view(R.lensProp('data'), responses[2]))
        })
      )
      .catch(err => {
        console.log(err.response)
      })
  }, [refresh])

  let test = [{}]
  if (data_graph_3) {
    test = R.compose(
      R.map(item => {
        const obj = {}
        const results = R.filter(
          R.where({ label: R.equals(item.label) }),
          data_graph_3
        )
        R.map(result => {
          obj[slugify(result.lesson)] = result.count
        }, results)
        return { ...item, ...obj }
      }),
      R.map(item => ({ label: item })),
      data_graph_3 => [...new Set(data_graph_3.map(item => item.label))]
    )(data_graph_3)
  }

  return (
    <div>
      <Card
        title={'Aantal inschrijvingen per maand'}
        extra={[
          <Tooltip title="Refresh" placement="bottom" key="1">
            <Button
              type="primary"
              style={{ marginRight: '12px' }}
              icon={<SyncOutlined />}
              shape="round"
              onClick={() => {
                refresh_data()
              }}
            />
          </Tooltip>
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
            <BarChart
              data={month_totals}
              dataKeys={{ xAxisLabelKey: 'label', yAxisValueKey: 'count' }}
            />
            <BarChart data={test} dataKeys={{ xAxisLabelKey: 'label' }} />
          </div>
        )}
      </Card>
      <br />
    </div>
  )
}
