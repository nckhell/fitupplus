//@flow
import React from 'react'
import './Logo.css'
import logo from '../../assets/img/logo.png'
import { Typography } from 'antd'

type Props = {
  collapsed: boolean
}

export const Logo = (props: Props) => {
  const { collapsed } = props
  const { Title } = Typography

  return (
    <div className="logo-wrapper">
      <a href="/" title="FitUp Plus">
        {' '}
        <img
          src={logo}
          className="logo-image"
          alt="Fit Up Plus logo"
          width="32"
          height="32"
        />
        {!collapsed && <Title level={4}>FitUp Plus</Title>}
      </a>
    </div>
  )
}
