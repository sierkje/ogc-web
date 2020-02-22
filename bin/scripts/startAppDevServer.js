// @ts-check
const spawn = require('cross-spawn')
const { APP } = require('./workspaces')

function startAppDevServer() {
  const app = spawn(
    'yarn',
    ['workspace', `ogc-web-${APP}`, 'react-scripts', 'start'],
    {
      stdio: 'inherit',
    }
  )
}

process.on('message', () => {
  startAppDevServer()
})
