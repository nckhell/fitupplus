//@flow
import React, { useState } from 'react'
import { message, Table, Popconfirm, Button, Tooltip } from 'antd'
import * as R from 'ramda'
import { Path as emailKey } from '../../api/inscriptions/lenses/emailLens'
import { Path as nameKey } from '../../api/inscriptions/lenses/nameLens'
import { Path as inscriptionDateKey } from '../../api/inscriptions/lenses/inscriptionDateLens'
import moment from 'moment'
import { api_client } from '../../helpers/axios/api_client'
import { PlusOutlined } from '@ant-design/icons'
import { idLens, startTimeLens, endTimeLens } from '../../api/roster/lenses'
import { CreateInscriptionFormModal } from '../Modals/CreateInscriptionModal'
import { titleLens } from '../../api/lessons/lenses'

export type PropsType = {|
  inscriptions: Array<{}>,
  roster: Array<{}>,
  lesson: Array<{}>,
  date: moment
|}

export const InscriptionTable = ({
  inscriptions,
  roster,
  date,
  lesson
}: PropsType) => {
  const [data, set_data] = useState(inscriptions)
  const [is_create_modal_visible, set_create_modal_visible] = useState(false)

  const columns = [
    {
      title: 'Name',
      dataIndex: nameKey.join(),
      key: nameKey.join(),
      width: '20%'
    },
    {
      title: 'Email',
      dataIndex: emailKey.join(),
      key: emailKey.join(),
      width: '30%'
    },
    {
      title: 'Inscription date',
      dataIndex: inscriptionDateKey.join(),
      key: inscriptionDateKey.join(),
      render: date => moment(date).format('DD-MM-YYYY kk:mm'),
      width: '40%'
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
              .delete(`/inscriptions/${id}`)
              .then(() => {
                message.success({
                  content: 'Inscription succesfully deleted!',
                  key: 'delete'
                })
                set_data(R.filter(R.compose(R.not, R.propEq('id', id)), data))
              })
              .catch(() => {
                message.error(
                  'Something went wrong, could not delete the inscription'
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

  const add_inscription = values => {
    const { name, email } = values
    message.loading({ content: 'Loading...', key: 'add' })

    api_client
      .post('/inscriptions', {
        roster_id: R.view(idLens, roster),
        date: moment(date).format('YYYY-MM-DD'),
        name,
        email
      })
      .then(response => {
        message.success({
          content: 'Inscription succesfully added!',
          key: 'add'
        })
        set_data(R.append(response.data.inscription, data))
        set_create_modal_visible(false)
      })
      .catch(err => {
        message.error({
          content: 'Something went wrong, could not add the inscription',
          key: 'add'
        })
        console.log(err)
      })
  }

  return (
    <div>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered
        footer={() => {
          return (
            <Tooltip title="Inschrijving toevoegen" placement="right">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                shape="circle"
                size="small"
                onClick={() => {
                  set_create_modal_visible(true)
                }}
              />
            </Tooltip>
          )
        }}
      />
      <CreateInscriptionFormModal
        visible={is_create_modal_visible}
        title={R.view(titleLens, lesson)}
        date_of_inscription={date}
        timeslot={`${R.view(startTimeLens, roster)}-${R.view(
          endTimeLens,
          roster
        )}`}
        onCreate={add_inscription}
        onCancel={() => {
          set_create_modal_visible(false)
        }}
      />
    </div>
  )
}
