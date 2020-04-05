//@flow
import React, { useState } from 'react'
import { message, Table, Popconfirm, Button } from 'antd'
import * as R from 'ramda'
import { api_client } from '../../helpers/axios/api_client'
import { Path as titleKey } from '../../api/lessons/lenses/titleLens'
import { Path as descriptionKey } from '../../api/lessons/lenses/descriptionLens'
import { Path as maxInscriptionsKey } from '../../api/lessons/lenses/maxInscriptionsLens'
import { strip_html } from '../../helpers/strings'

export type PropsType = {|
  lessons: Array<{}>
|}

export const LessonsTable = ({ lessons }: PropsType) => {
  const [data, set_data] = useState(lessons)

  const columns = [
    {
      title: 'Name',
      dataIndex: titleKey.join(),
      key: titleKey.join(),
      width: '15%'
    },
    {
      title: 'Description',
      dataIndex: descriptionKey.join(),
      key: descriptionKey.join(),
      render: description =>
        R.compose(
          description => description.substring(0, 150) + '...',
          description => strip_html(description)
        )(description),
      width: '60%'
    },
    {
      title: 'Max nbr. of insscriptins',
      dataIndex: maxInscriptionsKey.join(),
      key: maxInscriptionsKey.join(),
      width: '10%'
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      // eslint-disable-next-line react/display-name
      render: id => (
        <Popconfirm
          title="Sure to delete?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => {
            message.loading({ content: 'Loading...', key: 'delete' })
            api_client
              .delete(`/lessons/${id}`)
              .then(() => {
                message.success({
                  content: 'Lesson succesfully deleted!',
                  key: 'delete'
                })
                set_data(R.filter(R.compose(R.not, R.propEq('id', id)), data))
              })
              .catch(() => {
                message.error(
                  'Something went wrong, could not delete the lesson'
                )
              })
          }}
        >
          <Button type="default" danger>
            Delete
          </Button>
        </Popconfirm>
      )
    }
  ]

  return (
    <div>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered
      />
    </div>
  )
}
