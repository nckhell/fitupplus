import React, { useState } from 'react'
import { Alert, Form, Input, Button } from 'antd'
import './Login.css'
import logo from '../../assets/img/logo.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '../../contexts/auth-context'

export const Login = () => {
  const auth = useAuth()
  const [loading, set_loading] = useState(false)
  // let history = useHistory()

  return (
    <div className="wrapper">
      <div className="login-container">
        <Form
          name="login_form"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onFinish={async values => {
            const { email, password } = values
            set_loading(true)
            await auth.login({ email, password })
            set_loading(false)
            console.log(auth)
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
