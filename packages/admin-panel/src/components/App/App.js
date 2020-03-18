//@flow
import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { DashBoard } from '../DashBoard'
import { LoginPage } from '../../pages/LoginPage'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth } from '../../contexts/auth-context'

const App = () => {
  const { is_loading, user } = useAuth()

  if (is_loading) return <p>Loading</p>

  console.log(user)

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <ProtectedRoute path="/">
            <DashBoard />
          </ProtectedRoute>
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
