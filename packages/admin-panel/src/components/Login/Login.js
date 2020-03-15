import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Login.css'
import { Form, Input, Button, Checkbox } from 'antd'
import logo from '../../assets/img/logo.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { authenticate } from '../../helpers/auth/authenticate'
import { useQuery } from '@apollo/react-hooks'
import { User } from '../../graphql/queries/users/user.gql'

export const Login = () => {
  // const [error, setError] = useState(null)
  const { loading, error, data } = useQuery(User, {
    variables: { id: 10 }
  })
  let history = useHistory()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div className="wrapper">
      <div className="login-container">
        <Form
          name="login_form"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onFinish={values => authenticate(history, values)}
        >
          <div className="login-logo">
            <img src={logo} alt="Fit Up Plus logo" />
          </div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              size="large"
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              size="large"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              //   loading={true}
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
