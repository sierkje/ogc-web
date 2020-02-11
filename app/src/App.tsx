/** @jsx jsx */
import './App.css'

import { css, jsx, keyframes } from '@emotion/core'
import React from 'react'

import logo from './logo.svg'

const wrapperCss = css`
  text-align: center;
`
const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const logoCss = css`
  height: 40vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${logoSpin} infinite 20s linear;
  }
`
const headerCss = css`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
`
const linkCss = css`
  color: #61dafb;
}
`

const App: React.FC = () => {
  return (
    <div css={wrapperCss}>
      <header css={headerCss}>
        <img src={logo} css={logoCss} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          css={linkCss}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
