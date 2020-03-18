//@flow
import React from 'react'
import './App.css'
import { Spin } from 'antd'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { DashBoard } from '../DashBoard'
import { LoginPage } from '../../pages/LoginPage'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth } from '../../contexts/auth-context'

const App = () => {
  const { is_loading } = useAuth()

  return (
    <Router>
      <div className="App">
        {is_loading && (
          <div className="loading">
            <Spin size="large" />
          </div>
        )}
        {!is_loading && (
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <ProtectedRoute path="/">
              <DashBoard />
            </ProtectedRoute>
            <Route path="*" component={() => '404 NOT FOUND'} />
          </Switch>
        )}
      </div>
    </Router>
  )
}

export default App
