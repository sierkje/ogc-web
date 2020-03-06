// @ts-check

const { default: chalk } = require('chalk')

/**
 * @typedef {"app" | "server"} Workspace
 * @typedef {"info" | "error" | "success" | "warn"} LogType
 * @typedef {any[]} Messages
 */

/**
 * @type {Record<LogType, import('chalk').Chalk>}
 */
const withColor = {
  error: chalk.redBright,
  info: chalk.gray,
  success: chalk.green,
  warn: chalk.yellow,
}

function printInfo(message) {
  if (!message) {
    return
  }

  console.log(message)
}

function printWarning(message) {
  if (!message) {
    return
  }

  console.warn(message)
}

/**
 * @param {string | Error} error
 * @param {Workspace | void} workspace
 */
function printError(error, workspace) {
  if (!error) {
    return
  }

  const { message, stack, name } = error instanceof Error ? error : Error(error)

  console.error(
    withColor.error(
      `${workspace ? ` ${workspace.toUpperCase()}` : ''}${
        name ? name : 'Something went wrong...'
      }`
    )
  )
  message && printInfo(message)
  stack && printInfo(stack)
}

/**
 * @param {Workspace} workspace
 * @param {LogType} logType
 * @param {Messages} messages
 */
function log(workspace, logType, ...messages) {
  if (messages.length < 1) {
    return
  }

  if (messages.length > 1) {
    return messages.forEach(msg => log(workspace, logType, msg))
  }

  const [message] = messages

  if (logType === 'error') {
    printError(message)
  }

  if (Array.isArray(message)) {
    return message.forEach(msg => log(workspace, logType, msg))
  }

  const lines = String(message)
    .replace('\n\n', '\n')
    .split('\n')
    .map(msg => msg.trim())

  if (lines.length > 1) {
    return lines.forEach(msg => log(workspace, logType, msg))
  }

  const [line] = lines
    .map(msg =>
      logType === 'info' || msg === '' ? msg : withColor[logType](msg)
    )
    .map(msg => `${withColor.info(`[${workspace.toUpperCase()}]`)} ${msg}`)
    .map(msg => msg.trim())

  return logType === 'warn' ? printWarning(line) : printInfo(line)
}

/**
 * @param {Workspace} workspace
 * @param {LogType} logType
 * @returns {(...messages: Messages) => void}
 */
function createLogger(workspace, logType) {
  return function workspaceLog(...messages) {
    return log(workspace, logType, ...messages)
  }
}

function createSpacer(workspace) {
  return function spacer() {
    return log(workspace, 'info', '')
  }
}

/**
 * @param {Workspace} workspace
 * @returns {Record<LogType | "spacer", (...messages: Messages) => void>}
 */
function createLoggers(workspace) {
  return {
    error: createLogger(workspace, 'error'),
    info: createLogger(workspace, 'info'),
    success: createLogger(workspace, 'success'),
    warn: createLogger(workspace, 'warn'),
    spacer: createSpacer(workspace),
  }
}

/**
 * @param {string} title
 */
function printHeader(title) {
  printInfo('----------------------------------------------------')
  printInfo(`${title}\n`)
}

function printSpacer() {
  printInfo('')
}

const logger = {
  app: createLoggers('app'),
  server: createLoggers('server'),
  printError,
  printHeader,
  printSpacer,
}

module.exports = logger
