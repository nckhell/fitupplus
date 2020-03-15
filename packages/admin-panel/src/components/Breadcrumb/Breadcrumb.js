//@flow
import React from 'react'
import { Breadcrumb as AntdBreadcrumb, Typography } from 'antd'
import './Breadcrumb.css'
import { Link } from 'react-router-dom'
import { build_item_url } from '../../helpers/breadcrumb'
import { HomeOutlined } from '@ant-design/icons'

export type BreadcrumbItemType = {|
  name: string,
  partial_url: string
|}

export type PropsType = {|
  items: Array<BreadcrumbItemType>
|}

const { Text } = Typography

export const Breadcrumb = ({ items }: PropsType) => {
  return (
    <AntdBreadcrumb className="breadcrumb">
      <AntdBreadcrumb.Item key="home">
        <HomeOutlined />
      </AntdBreadcrumb.Item>
      {items.map(({ name }, index) => {
        const is_last_item = index === items.length - 1
        if (is_last_item) {
          return (
            <AntdBreadcrumb.Item key={name}>
              <Text secondary>{name}</Text>
            </AntdBreadcrumb.Item>
          )
        }

        return (
          <AntdBreadcrumb.Item key={name}>
            <Link to={build_item_url(items, index)}>
              <Text secondary>{name}</Text>
            </Link>
          </AntdBreadcrumb.Item>
        )
      })}
    </AntdBreadcrumb>
  )
}
