//@flow
import React from 'react'
import { Result, Button } from 'antd'
import { useHistory } from 'react-router-dom'

export const NotFoundPage = () => {
  const history = useHistory()

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" size="large" onClick={() => history.goBack()}>
          Go Back
        </Button>
      }
    />
  )
}
