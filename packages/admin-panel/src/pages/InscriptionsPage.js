import React, { useState, useEffect } from 'react'
import * as moment from 'moment'
import { DatePicker, Card, Col, Row, Statistic } from 'antd'
import axios from 'axios'

export const InscriptionsPage = () => {
  const [date, setDate] = useState(moment())

  useEffect(() => {
    axios
      .get(
        'http://localhost:8000/api/inscriptions/statistics/inscriptions_by_lessons/3'
      )
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Row justify="space-between" gutter={[16, 16]}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="Totaal aantal inschrijvingen" value={112893} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title={`Aantal inschrijvingen in ${moment()
                .locale('nl')
                .format('MMMM')}`}
              value={112893}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title={`Inschrijvingen ${moment()
                .locale('nl')
                .format('dddd DD MMMM')}`}
              value={112893}
            />
          </Card>
        </Col>
      </Row>
      <br />
      <Card
        title={`Inschrijvingen op ${date.format('DD/MM/YYYY')}`}
        extra={
          <DatePicker
            size="large"
            format="DD/MM/YYYY"
            onChange={date => setDate(date)}
            value={date}
            defaultPickerValue={date}
          />
        }
        bordered={false}
      ></Card>
    </div>
  )
}
