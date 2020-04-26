import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import { useParams, useHistory } from 'react-router-dom'
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
  maxInscriptionsPath,
  imagesLens
} from '../../../api/lessons/lenses'
import { idLens, firstNameLens, lastNameLens } from '../../../api/team/lenses'
import { UploadOutlined } from '@ant-design/icons'
import {
  formItemLayout,
  tailFormItemLayout
} from '../../../assets/layout/form_layout'

export const EditLessonPage = () => {
  const { id } = useParams()
  const [team, set_team] = useState([])
  const [updating, set_updating] = useState(false)
  const [lesson, set_lesson] = useState(null)
  const history = useHistory()
  const [loading, set_loading] = useState(true)
  const [file_list, set_file_list] = useState([])
  const [new_file_list, set_new_file_list] = useState([])
  const [removed_file_list, set_removed_file_list] = useState([])
  const [form] = Form.useForm()
  const { TextArea } = Input

  useEffect(() => {
    set_loading(true)
    api_client.get('/team').then(res => {
      set_team(R.view(R.lensPath(['data', 'data']), res))
    })
    api_client.get(`/lessons/${id}`).then(res => {
      const lesson = R.view(R.lensPath(['data', 'data']), res)
      set_lesson(lesson)
      set_file_list(
        R.compose(lessons => {
          if (lessons) {
            const create_file_list_entry = file => {
              return {
                uid: file.img_path,
                name: file.img_path,
                status: 'done',
                url: file.img_url
              }
            }

            return R.map(create_file_list_entry, lessons)
          }
          return []
        }, R.view(imagesLens))(lesson)
      )
      set_loading(false)
    })
  }, [id])

  const update_lesson = values => {
    set_updating(true)
    let data = new FormData()

    R.compose(
      R.forEachObjIndexed((value, key) => {
        R.isNil(value) ? false : data.append(key, value)
      }),
      R.omit(['images'])
    )(values)

    new_file_list.forEach(file => {
      data.append('images[]', file)
    })

    data.append('removed_images[]', [])
    for (var i = 0; i < removed_file_list.length; i++) {
      data.append('removed_images[]', removed_file_list[i])
    }

    // Laravel method spoofing
    data.append('_method', 'PUT')

    message.loading({ content: 'Loading...', key: 'edit-lesson' })

    api_client
      .post(`/lessons/${id}`, data, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      .then(() => {
        message.success({
          content: 'Lesson succesfully edited!',
          key: 'edit-lesson'
        })
        set_updating(false)
        setTimeout(() => {
          history.push('/groepslessen/lessen')
        }, 1500)
      })
      .catch(err => {
        message.error({
          content: 'Something went wrong, could save the changes to the lesson',
          key: 'edit-lesson'
        })
        console.log(err)
        set_updating(false)
      })
  }

  const upload_props = {
    accept: 'image/png, image/jpeg',
    listType: 'picture-card',
    multiple: true,
    onRemove: file => {
      const delete_from_file_list = (list, file_to_delete) => {
        const index = list.indexOf(file_to_delete)
        const wip_list = list.slice()
        wip_list.splice(index, 1)
        return wip_list
      }

      set_removed_file_list([...removed_file_list, file.uid])
      set_file_list(delete_from_file_list(file_list, file))
      set_new_file_list(delete_from_file_list(new_file_list, file))
    },
    beforeUpload: (file, fileList) => {
      set_file_list([...file_list, ...fileList])
      set_new_file_list([...new_file_list, ...fileList])
      return false
    },
    fileList: file_list
  }

  if (loading) {
    return (
      <div>
        <Card title="Groepsles bewerken" bordered={false}>
          <div className="loading" style={{ paddingTop: '12px' }}>
            <Spin />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <Card title="Groepsles bewerken" bordered={false}>
        <Form
          {...formItemLayout}
          form={form}
          initialValues={{
            ...lesson,
            instructor_id: R.compose(
              id => id.toString(),
              R.view(R.lensPath(instructorIdPath))
            )(lesson)
          }}
          name="update_lesson"
          onFinish={update_lesson}
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
            <Button type="primary" htmlType="submit" loading={updating}>
              Opslaan
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <br />
    </div>
  )
}
