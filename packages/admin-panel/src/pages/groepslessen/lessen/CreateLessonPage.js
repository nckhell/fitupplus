import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import { useHistory } from 'react-router-dom'
import {
  Card,
  Spin,
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  Upload,
  message
} from 'antd'
import { api_client } from '../../../helpers/axios/api_client'
import {
  titlePath,
  descriptionPath,
  imagesPath,
  instructorIdPath,
  maxInscriptionsPath
} from '../../../api/lessons/lenses'
import { idLens, firstNameLens, lastNameLens } from '../../../api/team/lenses'
import { UploadOutlined } from '@ant-design/icons'
import {
  formItemLayout,
  tailFormItemLayout
} from '../../../assets/layout/form_layout'

export const CreateLessonPage = () => {
  const [team, set_team] = useState([])
  const [loading, set_loading] = useState(false)
  const [file_list, set_file_list] = useState([])
  const [form] = Form.useForm()
  const history = useHistory()
  const { TextArea } = Input

  useEffect(() => {
    api_client.get('/team').then(res => {
      set_team(R.view(R.lensPath(['data', 'data']), res))
    })
  }, [])

  const create_lesson = values => {
    set_loading(true)
    let data = new FormData()

    R.compose(
      R.forEachObjIndexed((value, key) => {
        R.isNil(value) ? false : data.append(key, value)
      }),
      R.omit(['images'])
    )(values)

    file_list.forEach(file => {
      data.append('images[]', file)
    })

    message.loading({ content: 'Loading...', key: 'add' })

    api_client
      .post('/lessons', data, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      .then(() => {
        message.success({
          content: 'Lesson succesfully added!',
          key: 'add'
        })
        set_loading(false)
        setTimeout(() => {
          history.push('/groepslessen/lessen')
        }, 1500)
      })
      .catch(err => {
        message.error({
          content: 'Something went wrong, could not add the lesson',
          key: 'add'
        })
        console.log(err)
        set_loading(false)
      })
  }

  const upload_props = {
    accept: 'image/png, image/jpeg',
    multiple: true,
    onRemove: file => {
      const index = file_list.indexOf(file)
      const new_file_list = file_list.slice()
      new_file_list.splice(index, 1)
      set_file_list(new_file_list)
    },
    beforeUpload: (file, fileList) => {
      set_file_list([...file_list, ...fileList])
      return false
    },
    fileList: file_list
  }

  return (
    <div>
      <Card title="Groepsles toevoegen" bordered={false}>
        <Form
          {...formItemLayout}
          form={form}
          name="create_lesson"
          onFinish={create_lesson}
          scrollToFirstError
        >
          <Form.Item
            name={titlePath[0]}
            label="Naam groepsles"
            rules={[
              {
                required: true,
                message: 'Please input a name for the lesson'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={instructorIdPath[0]}
            label="Lesgever"
            rules={[
              {
                required: true,
                message: 'Please select a teacher'
              }
            ]}
          >
            <Select
              notFoundContent={R.isEmpty(team) ? <Spin size="small" /> : null}
            >
              {team.map(team_member => (
                <Select.Option key={R.view(idLens, team_member)}>
                  {R.view(firstNameLens, team_member)}{' '}
                  {R.view(lastNameLens, team_member)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={descriptionPath} label="Beschrijving">
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item name={maxInscriptionsPath} label="Maximum aantal plaatsen">
            <InputNumber />
          </Form.Item>
          <Form.Item name={imagesPath} label="Afbeeldingen">
            <Upload {...upload_props}>
              <Button>
                <UploadOutlined /> Upload
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Toevoegen
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <br />
    </div>
  )
}
