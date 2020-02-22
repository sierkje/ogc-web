/** @jsx jsx */

import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import { css, Global, jsx } from '@emotion/core'

import routes from '../constants/routes'
import site from '../constants/site'
import colors from '../constants/theme/colors'
import fonts from '../constants/theme/fonts'
import normalizeCss from '../constants/theme/normalizeCss'
import pxToRem from '../helpers/pxToRem'
import useGoogleFont from '../hooks/useGoogleFont'

const menuItems = Object.keys(routes)
  .map(key => ({ key, ...routes[key] }))
  .reduce<{ key: string; to: string; weight: number; label: string }[]>(
    (items, { key, path, menu }) => {
      if (!menu || !path) {
        return items
      }
      return [
        ...items,
        { key, to: path, label: menu.label, weight: menu.weight },
      ]
    },
    []
  )
  .sort((a, b) => a.weight - b.weight)

const PX = {
  gutter: 10,
  header: { height: 40, fontSize: 20 },
  navbar: {},
}

const REM = {
  gutter: pxToRem(PX.gutter),
  header: {
    height: pxToRem(PX.header.height),
    fontSize: pxToRem(PX.header.fontSize),
    padding: {
      y: pxToRem((PX.header.height - PX.header.fontSize) / 2),
    },
  },
  maxWidth: pxToRem(960 - 2 * PX.gutter),
}

const GRID_AREAS = {
  menu: 'navbar-menu',
  branding: 'navbar-branding',
}

const styles = {
  branding: css`
    display: inline;
    font-family: ${fonts.body.family};
    font-size: 1.2em;
    grid-area: ${GRID_AREAS.branding};
    letter-spacing: -0.1rem;
    margin: 0 1rem 0 0;
    padding: 0;
  `,
  global: css`
    html: {
      font-size: 16px;
      font-size-adjust: 1;
    }

    html * {
      box-sizing: border-box;
    }

    body {
      background-color: ${colors.white};
      color: ${colors.black};
      font-family: ${fonts.heading.family}, ${fonts.body.fallback};
      font-size: 1rem;
      font-weight: ${fonts.body.weight};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: ${fonts.heading.weight};
    }
  `,
  header: css`
    background-color: ${colors.blueDark};
    color: ${colors.white};
    font-size: ${REM.header.fontSize};
    height: ${REM.header.height};
    left: 0;
    margin: 0;
    padding: 0;
    position: fixed;
    right: 0;
    top: 0;
  `,
  main: css`
    margin: ${REM.header.height} auto ${REM.gutter};
    min-height: calc(100vh - ${REM.header.height});
    max-width: ${REM.maxWidth};
    padding: ${REM.gutter};
  `,
  menu: css`
    display: grid;
    grid-area: ${GRID_AREAS.menu};
    grid-template-columns: repeat(${menuItems.length + 1}, auto) 1fr;
    grid-template-rows: 1fr;
    list-style: none;
    list-style-image: none;
    list-style-type: none;
    margin: 0;
    padding: 0;
  `,
  menuItem: css`
    display: inline-block;
    margin: 0;
    padding: 0 ${REM.gutter};
  `,
  navbar: css`
    display: grid;
    grid-template-areas: "${GRID_AREAS.branding} ${GRID_AREAS.menu}";
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    margin: 0 auto;
    max-width: ${REM.maxWidth};
    padding: 0;
  `,
  navlink: css`
    display: inline-block;
    color: ${colors.white};
    margin: 0;
    padding: ${REM.header.padding.y} ${REM.gutter};
    text-decoration: none;

    &[aria-current] {
      color: ${colors.black};
      background-color: ${colors.blueLight};
    }
  `,
}

const Menu: React.FC = () => {
  return (
    <ul css={styles.menu}>
      {menuItems.map(({ weight, label, ...props }) => (
        <li css={styles.menuItem}>
          <NavLink {...props} css={styles.navlink}>
            {label}
          </NavLink>
        </li>
      ))}
      {process.env.NODE_ENV === 'development' && (
        <li css={styles.menuItem}>
          <NavLink to="/graphql" css={styles.navlink}>
            <span aria-label="API playground" role="img">
              🚀
            </span>
          </NavLink>
        </li>
      )}
    </ul>
  )
}

const Layout: React.FC = ({ children }) => {
  useGoogleFont(fonts.heading.family, fonts.body.weight)

  return (
    <React.Fragment>
      <Global styles={normalizeCss} />
      <Global styles={styles.global} />
      <header css={styles.header} role="banner">
        <div css={styles.navbar}>
          <h1 css={styles.branding}>
            <Link to="/" css={styles.navlink}>
              {site.name}
            </Link>
          </h1>
          <Menu />
        </div>
      </header>
      <main id="main-content" css={styles.main}>
        {children}
      </main>
    </React.Fragment>
  )
}

export default Layout
