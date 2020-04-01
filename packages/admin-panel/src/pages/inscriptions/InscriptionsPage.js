import React, { useState, useEffect } from 'react'
import './inscriptions-page.css'
import * as moment from 'moment'
import * as R from 'ramda'
import {
  DatePicker,
  Card,
  Empty,
  PageHeader,
  Tag,
  Spin,
  Divider,
  Button,
  Tooltip
} from 'antd'
import { api_client } from '../../helpers/axios/api_client'
import { StatisticsHeader } from './statistics'
import { InscriptionTable } from '../../components/InscriptionTable'
import { titleLens } from '../../api/lessons/lenses'
import { startTimeLens, endTimeLens } from '../../api/roster/lenses'
import { SyncOutlined } from '@ant-design/icons'

type InscriptionTablePropsType = {
  data: Array<any>,
  date: moment
}

const InscriptionTables = ({ data, date }: InscriptionTablePropsType) => {
  if (R.isNil(data) || R.isEmpty(data)) {
    const is_today = !moment(date).diff(moment(), 'days')
    if (is_today) {
      return <Empty description={<span>Geen lessen vandaag.</span>}></Empty>
    }
    return <Empty description={<span>Geen lessen op deze dag.</span>}></Empty>
  }

  return (
    <div>
      {data.map((roster_entry, index) => {
        return (
          <div key={index}>
            <PageHeader
              className="inscription-table-header"
              title={R.view(titleLens, roster_entry.lesson)}
              tags={
                <Tag color="blue">
                  {R.view(startTimeLens, roster_entry)} -{' '}
                  {R.view(endTimeLens, roster_entry)}
                </Tag>
              }
            />
            <InscriptionTable
              inscriptions={roster_entry.inscriptions.data}
              roster={roster_entry}
              lesson={roster_entry.lesson}
              date={date}
              key={index}
            />
            <Divider />
          </div>
        )
      })}
    </div>
  )
}

export const InscriptionsPage = () => {
  const [date, set_date] = useState(moment())
  const [data, set_data] = useState(null)
  const [loading, set_loading] = useState(true)
  const [refresh, set_refresh] = useState(false)

  const refresh_data = () => set_refresh(!refresh)

  useEffect(() => {
    set_loading(true)

    const year = moment(date).format('YYYY')
    const month = moment(date).format('MM')
    const day = moment(date).format('DD')
    api_client.get(`/inscriptions/${year}/${month}/${day}`).then(res => {
      set_data(R.view(R.lensPath(['data', 'data']), res))
      set_loading(false)
    })
  }, [date, refresh])

  return (
    <div>
      <StatisticsHeader />
      <br />
      <Card
        title={`Inschrijvingen op ${date.format('DD/MM/YYYY')}`}
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
          </Tooltip>,
          <DatePicker
            key="2"
            size="large"
            format="DD/MM/YYYY"
            onChange={date => {
              set_date(date)
            }}
            value={date}
            defaultPickerValue={date}
          />
        ]}
        bordered={false}
      >
        {loading && (
          <div className="loading" style={{ paddingTop: '12px' }}>
            <Spin />
          </div>
        )}
        {!loading && <InscriptionTables data={data} date={date} />}
      </Card>
      <br />
    </div>
  )
}
