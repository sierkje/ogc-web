import ApolloClient from 'apollo-boost'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ApolloProvider } from '@apollo/react-hooks'

import routes from '../constants/routes'
import AccessProvider from './AccessProvider'
import ApiPlayground from './ApiPlayground'
import Home from './Home'
import Layout from './Layout'
import NotFound from './NotFound'

const ROUTES = Object.keys(routes).map(id => ({ id, ...routes[id] }))

const ApiProvider: React.FC = ({ children }) => {
  const client = new ApolloClient({ uri: '/api' })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

const App: React.FC = () => {
  return (
    <ApiProvider>
      <AccessProvider>
        <BrowserRouter>
          <Layout>
            <Switch>
              {ROUTES.map(({ id, path, component, exact = false }) => (
                <Route
                  key={id}
                  path={path}
                  component={component}
                  exact={exact}
                />
              ))}
              {process.env.NODE_ENV === 'development' && (
                <Route key="api" path="/graphql" component={ApiPlayground} />
              )}
              <Route
                key="home"
                path={['/', '/index.html', '/index.htm']}
                exact
                component={Home}
              />
              <Route key={404} component={NotFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </AccessProvider>
    </ApiProvider>
  )
}

export default App
