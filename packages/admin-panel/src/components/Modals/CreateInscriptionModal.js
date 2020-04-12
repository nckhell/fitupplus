//@flow
import React from 'react'
import { Modal, Form, Input, PageHeader, Tag } from 'antd'
import moment from 'moment'

type InscriptionFormValues = {
  name: string,
  email?: string
}

type CreateInscriptionFormModalProps = {
  visible: boolean,
  title: string,
  date_of_inscription: string,
  timeslot: string,
  onCreate: (values: InscriptionFormValues) => void,
  onCancel: () => void
}

export const CreateInscriptionFormModal = ({
  visible,
  onCreate,
  onCancel,
  title,
  date_of_inscription,
  timeslot
}: CreateInscriptionFormModalProps) => {
  const [form] = Form.useForm()

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 4
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 16
      }
    }
  }

  return (
    <Modal
      visible={visible}
      title={
        <PageHeader
          className="add-inscription-header"
          title={`${title} op ${moment(date_of_inscription).format(
            'DD/MM/YYYY'
          )}`}
          tags={<Tag color="blue">{timeslot}</Tag>}
        />
      }
      okText="Toevoegen"
      cancelText="Annuleren"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then(values => {
          form.resetFields()
          onCreate(values)
        })
      }}
    >
      <Form {...formItemLayout} form={form} name="create_inscription_in_modal">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name of the particpant!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
