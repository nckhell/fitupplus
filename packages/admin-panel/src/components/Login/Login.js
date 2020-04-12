//@flow
import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { Alert, Form, Input, Button } from 'antd'
import './Login.css'
import logo from '../../assets/img/logo.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '../../contexts/auth-context'

export const Login = () => {
  const auth = useAuth()
  const [loading, set_loading] = useState(false)
  const history = useHistory()

  if (auth.is_authenticated) {
    return <Redirect to="/" />
  }

  return (
    <div className="wrapper">
      <div className="login-container">
        <Form
          name="login_form"
          className="login-form"
          onFinish={async values => {
            const { email, password } = values
            set_loading(true)
            auth.login({ email, password, history }).then(() => {
              set_loading(false)
            })
          }}
        >
          <div className="login-logo">
            <img src={logo} alt="Fit Up Plus logo" />
          </div>
          {!!auth.errors && (
            <Alert
              message={auth.errors}
              type="error"
              showIcon
              className="errors"
            />
          )}
          {!!auth.message && (
            <Alert
              message={auth.message}
              type="info"
              showIcon
              className="errors"
            />
          )}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Email is required'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              id="email"
              size="large"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Password is required'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              id="password"
              size="large"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
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
