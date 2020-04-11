//@flow
import React, { useState } from 'react'
import { message, Table, Popconfirm, Button } from 'antd'
import * as R from 'ramda'
import { api_client } from '../../helpers/axios/api_client'
import {
  titlePath,
  descriptionPath,
  maxInscriptionsPath,
  instructorPath
} from '../../api/lessons/lenses/'
import { firstNameLens, lastNameLens } from '../../api/team/lenses'

import { strip_html } from '../../helpers/strings'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

export type PropsType = {|
  lessons: Array<{}>
|}

export const LessonsTable = ({ lessons }: PropsType) => {
  const [data, set_data] = useState(lessons)
  const history = useHistory()

  const columns = [
    {
      title: 'Name',
      dataIndex: titlePath.join(),
      key: titlePath.join(),
      width: '12%'
    },
    {
      title: 'Instructor',
      dataIndex: instructorPath,
      key: instructorPath.join(),
      width: '12%',
      render: instructor =>
        R.view(firstNameLens, instructor) +
        ' ' +
        R.view(lastNameLens, instructor)
    },
    {
      title: 'Description',
      dataIndex: descriptionPath.join(),
      key: descriptionPath.join(),
      render: description =>
        R.compose(
          description => description.substring(0, 120) + '...',
          description => strip_html(description)
        )(description),
      width: '55%'
    },
    {
      title: 'Max nbr. of inscriptions',
      dataIndex: maxInscriptionsPath.join(),
      key: maxInscriptionsPath.join(),
      width: '5%'
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      // eslint-disable-next-line react/display-name
      render: id => (
        <div>
          <Button
            type="default"
            style={{ marginRight: '12px' }}
            icon={<EditOutlined />}
            onClick={() => history.push(`/groepslessen/lessen/edit/${id}`)}
          >
            Edit
          </Button>
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
            <Button type="default" icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
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
