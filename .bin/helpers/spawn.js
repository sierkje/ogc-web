// @ts-check

const crossSpawn = require('cross-spawn')

const from = require('./from')
const { printError, printInfo, ...logger } = require('./logger')

/**
 * @param {"app" | "server" | "root"} workspace
 * @returns {(command: string, ...args: string[]) => Promise<string>}
 */
function createSpawn(workspace) {
  return function promisedSpawn(command, ...args) {
    let stdout = ''
    let stderr = ''

    /**
     * @type {import('child_process').SpawnOptions}
     */
    const options = { cwd: from[workspace](), stdio: 'pipe' }
    const colored = [...args, '--colors']
    const childProcess = crossSpawn(command, colored, options)

    childProcess.stdout.on('data', function onSpawnStdout(chunk) {
      stdout = `${stdout}${chunk}`

      return workspace === 'root'
        ? printInfo(chunk)
        : logger[workspace].info(chunk)
    })

    childProcess.stderr.on('data', function onSpawnStderr(chunk) {
      stdout = `${stderr}${chunk}`

      return workspace === 'root'
        ? printError(chunk)
        : logger[workspace].error(chunk)
    })

    return new Promise((resolve, reject) => {
      childProcess
        .on('error', function onSpawnError(error) {
          return error instanceof Error ? reject(error) : reject(Error(error))
        })
        .on('exit', function onSpawnExit(code) {
          return code === 0 ? resolve(stdout) : reject(Error(stderr))
        })
    })
  }
}

const spawn = {
  app: createSpawn('app'),
  root: createSpawn('root'),
  server: createSpawn('server'),
}

module.exports = spawn
