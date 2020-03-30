//@flow
import React from 'react'
import './App.css'
import { Spin } from 'antd'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { DashBoard } from '../DashBoard'
import { LoginPage } from '../../pages/LoginPage'
import { NotFoundPage } from '../../pages/404/NotFoundPage'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth } from '../../contexts/auth-context'

const App = () => {
  const { is_loading } = useAuth()

  if (is_loading) {
    return (
      <div className="App">
        <div className="loading">
          <Spin size="large" />
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <ProtectedRoute path="/">
            <DashBoard />
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  )
}

export default App
