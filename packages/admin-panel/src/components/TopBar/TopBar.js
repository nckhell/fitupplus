//@flow
import React from 'react'
import './TopBar.css'
import { useHistory } from 'react-router-dom'
import { Layout, Menu, Avatar } from 'antd'
import { useAuth } from '../../contexts/auth-context'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

type Props = {
  collapsed: boolean,
  toggleCollapsed: void
}

export const TopBar = (props: Props) => {
  const { collapsed, toggleCollapsed } = props
  const auth = useAuth()
  const { Header } = Layout
  const { SubMenu } = Menu
  let history = useHistory()

  return (
    <Header className="topbar" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggleCollapsed
      })}
      <div className="topbar-spacer"></div>
      <div className="topbar-right">
        <Menu key="user" mode="horizontal" className="user-menu">
          <SubMenu
            title={
              <React.Fragment>
                <span style={{ color: '#999', marginRight: 4 }}>Hi,</span>
                <span>Nick</span>
                <Avatar
                  style={{ marginLeft: 8 }}
                  src="https://image.zuiidea.com/photo-1525879000488-bff3b1c387cf.jpeg?imageView2/1/w/200/h/200/format/webp/q/75|imageslim"
                />
              </React.Fragment>
            }
          >
            <Menu.Item key="SignOut" onClick={() => auth.logout(history)}>
              Sign out
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Header>
  )
}
