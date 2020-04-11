//@flow
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './components/App'
import * as serviceWorker from './serviceWorker'
import { AuthProvider } from './contexts/auth-context'
import { ConfigProvider } from 'antd'
import { BreadcrumbProvider } from './contexts/breadcrumb-context'
import nl_BE from 'antd/lib/locale-provider/nl_BE'
import moment from 'moment'
import 'moment/locale/nl-be'

moment.locale('nl-be')

const root = document.getElementById('root')

if (root === null) {
  throw new Error('No "root" html element found in the index.html file')
} else {
  ReactDOM.render(
    <AuthProvider>
      <BreadcrumbProvider>
        <ConfigProvider locale={nl_BE}>
          <App />
        </ConfigProvider>
      </BreadcrumbProvider>
    </AuthProvider>,
    root
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
