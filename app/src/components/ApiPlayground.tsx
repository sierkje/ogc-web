/** @jsx jsx */
import React from 'react'
import ReactDOM from 'react-dom'

import { css, jsx } from '@emotion/core'

import pxToRem from '../helpers/pxToRem'

const topRem = pxToRem(40)

const getWrapper = () => {
  const wrapper = document.createElement('div')
  wrapper.style.bottom = '0'
  wrapper.style.left = '0'
  wrapper.style.position = 'fixed'
  wrapper.style.right = '0'
  wrapper.style.top = topRem
  wrapper.style.height = `calc(100vh - ${topRem})`
  wrapper.style.width = '100vw'

  return wrapper
}

const ApiPlayground: React.FC<{}> = () => {
  const [domNode] = React.useState(getWrapper)
  React.useLayoutEffect(() => {
    if (domNode) {
      document.body.appendChild(domNode)
      return () => {
        document.body.removeChild(domNode)
      }
    }
  }, [domNode])

  return ReactDOM.createPortal(
    <iframe
      title="API playground"
      src="/api"
      css={css`
        position: absolute;
        top: 1vw;
        left: 1vw;
        width: 97vw;
        max-width: 95%;
        height: calc(98vh - ${topRem});
      `}
    />,
    domNode
  )
}

export default ApiPlayground
