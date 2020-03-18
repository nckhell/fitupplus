//@flow
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './components/App'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'
import { AuthProvider } from './contexts/auth-context'

axios.defaults.baseURL = process.env.API_URL
axios.defaults.withCredentials = true

const root = document.getElementById('root')

if (root === null) {
  throw new Error('No "root" html element found in the index.html file')
} else {
  ReactDOM.render(
    <AuthProvider>
      <App />
    </AuthProvider>,
    root
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
