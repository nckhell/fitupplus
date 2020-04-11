//@flow
import React from 'react'
import * as R from 'ramda'
import './TopBar.css'
import { useHistory } from 'react-router-dom'
import { Layout, Menu, Avatar } from 'antd'
import { useAuth } from '../../contexts/auth-context'
import { userNameLens } from '../../api/auth/user/lenses'

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
              !!auth.user && (
                <React.Fragment>
                  <span style={{ color: '#999', marginRight: 4 }}>Hi,</span>
                  <span>{R.view(userNameLens, auth.user)}</span>
                  <Avatar style={{ marginLeft: 8, backgroundColor: '#1890ff' }}>
                    {R.view(userNameLens, auth.user).substring(0, 1)}
                  </Avatar>
                </React.Fragment>
              )
            }
          >
            <Menu.Item key="SignOut" onClick={() => auth.logout(history)}>
              <span id="sign-out">Sign out</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Header>
  )
}
