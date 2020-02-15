/** @jsx jsx */

import React from 'react'
import { NavLink } from 'react-router-dom'

import { css, Global, jsx } from '@emotion/core'

import site from '../constants/site'
import colors from '../constants/theme/colors'
import fonts from '../constants/theme/fonts'
import normalizeCss from '../constants/theme/normalizeCss'
import pxToRem from '../helpers/pxToRem'
import useGoogleFont from '../hooks/useGoogleFont'

const PX = {
  gutter: 10,
  header: { height: 40, fontSize: 24 },
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
    grid-area: ${GRID_AREAS.branding};
    letter-spacing: -0.1rem;
    margin: 0;
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
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    list-style: none;
    list-style-image: none;
    list-style-type: none;
    margin: 0;
    padding: 0;
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
    display: block;
    color: ${colors.white};
    font-size: ${REM.header.fontSize};
    margin: 0;
    padding: ${REM.header.padding.y} ${REM.gutter};
    text-decoration: none;
  `,
}

const Menu: React.FC = () => {
  return (
    <ul css={styles.menu}>
      <li>Hello</li>
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
            <NavLink to="/" css={styles.navlink}>
              {site.name}
            </NavLink>
            <Menu />
          </h1>
        </div>
      </header>
      <main id="main-content" css={styles.main}>
        {children}
      </main>
    </React.Fragment>
  )
}

export default Layout
