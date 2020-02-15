import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import routes from '../constants/routes'
import AccessProvider from './AccessProvider'
import Home from './Home'
import Layout from './Layout'
import NotFound from './NotFound'

const ROUTES = Object.keys(routes).map(id => ({ id, ...routes[id] }))

const App: React.FC = () => {
  return (
    <AccessProvider>
      <BrowserRouter>
        <Layout>
          <Switch>
            {ROUTES.map(({ id, path, component, exact = false }) => (
              <Route key={id} path={path} component={component} exact={exact} />
            ))}
            <Route key="home" path={['/', '/index.html', '/index.htm']} exact>
              <Home />
            </Route>
            <Route key={404}>
              <NotFound />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </AccessProvider>
  )
}

export default App
