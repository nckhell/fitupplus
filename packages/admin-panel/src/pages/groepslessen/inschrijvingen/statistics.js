import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import * as moment from 'moment'
import { Card, Col, Row, Statistic } from 'antd'
import { api_client } from '../../../helpers/axios/api_client'
import {
  dailyTotalInscriptionsLens,
  monthlyTotalInscriptionsLens,
  totalInscriptionsLens
} from '../../../api/inscriptions/statistics/lenses'

export const StatisticsHeader = () => {
  const [data, set_data] = useState(null)
  const [loading, set_loading] = useState(true)

  useEffect(() => {
    api_client.get('/inscriptions/statistics/totals').then(res => {
      set_loading(false)
      set_data(res.data)
    })
  }, [])

  return (
    <Row justify="space-between" gutter={[16, 16]}>
      <Col span={8}>
        <Card bordered={false} loading={loading}>
          <Statistic
            title="Totaal aantal inschrijvingen"
            value={R.view(totalInscriptionsLens, data)}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false} loading={loading}>
          <Statistic
            title={`Aantal inschrijvingen in ${moment()
              .locale('nl')
              .format('MMMM')}`}
            value={R.view(monthlyTotalInscriptionsLens, data)}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false} loading={loading}>
          <Statistic
            title={`Inschrijvingen ${moment()
              .locale('nl')
              .format('dddd DD MMMM')}`}
            value={R.view(dailyTotalInscriptionsLens, data)}
          />
        </Card>
      </Col>
    </Row>
  )
}
