import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'

const HOME = 'home'
const NOT_FOUND = '404'

interface RouteItem {
  path?: string
  aliases?: [string, ...string[]]
  label?: string
  weight?: number
  exact?: boolean
}
interface RouteWithoutMenuItem extends RouteItem {
  label?: never
  weight?: never
}
interface HomeRouteItem extends RouteWithoutMenuItem {
  path: '/'
  aliases: [string, string, ...string[]]
  exact: true
}
interface NotFoundRouteItem extends RouteWithoutMenuItem {
  path?: never
  aliases?: never
  exact: false
}
interface RouteItems {
  [HOME]: HomeRouteItem
  [NOT_FOUND]: NotFoundRouteItem
  [key: string]: RouteWithMenuItem | RouteWithoutMenuItem
}
interface RouteWithMenuItem extends RouteItem {
  path: string
  label: string
}

const routes: RouteItems = {
  [HOME]: { path: `/`, aliases: ['/index.htm', '/index.html'], exact: true },
  [NOT_FOUND]: { exact: false },
  blog: { path: '/blog', aliases: ['/blog.html'], label: 'Blog' },
}

const routeArray = Object.keys(routes)
  .filter(id => ![HOME, NOT_FOUND].includes(id))
  .map(id => ({ ...routes[id], id }))
  .map(({ id: key, path, aliases = [], exact }) => {
    const to = path && aliases.length > 0 ? [path, ...aliases] : path
    const component = Home
    return { key, to, exact, component }
  })
// .map({id,} => ({}))

const Routes: React.FC<{}> = ({}) => {
  return (
    <Switch>
      {routeArray.map(props => (
        <Route {...props} />
      ))}
    </Switch>
  )
}

export default Routes
