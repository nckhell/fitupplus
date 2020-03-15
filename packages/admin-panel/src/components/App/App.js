//@flow
import React from 'react'
import './App.css'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { DashBoard } from '../DashBoard'
import { LoginPage } from '../../pages/LoginPage'
import { apollo_client } from '../../graphql/apollo_client'

const App = () => {
  return (
    <Router>
      <ApolloProvider client={apollo_client}>
        <div className="App">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={DashBoard} />
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  )
}

export default App
