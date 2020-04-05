import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import { Card, Spin } from 'antd'
import { api_client } from '../../../helpers/axios/api_client'
import { LessonsTable } from '../../../components/LessonsTable'

export const LessonsPage = () => {
  const [lessons, set_lessons] = useState(null)
  const [loading, set_loading] = useState(true)

  useEffect(() => {
    set_loading(true)

    api_client.get('/lessons').then(res => {
      set_lessons(R.view(R.lensPath(['data', 'data']), res))
      set_loading(false)
    })
  }, [])

  return (
    <div>
      <Card title="Groepslessen" bordered={false}>
        {loading && (
          <div className="loading" style={{ paddingTop: '12px' }}>
            <Spin />
          </div>
        )}
        {!loading && <LessonsTable lessons={lessons} />}
      </Card>
      <br />
    </div>
  )
}
