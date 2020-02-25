import * as fs from 'fs'
import { join as pathJoin } from 'path'

import { Workspace, workspaces } from './workspaces'

// @ts-check
const rimraf = require('rimraf')

export function clean(workspace: Workspace) {
  const buildFolder = pathJoin(__dirname, '..', '..', workspace, 'build')
  if (fs.existsSync(buildFolder)) {
    console.log(`Removing existing ${workspace.toUpperCase()} build folder.`)
    rimraf(buildFolder, (error: Error) => {
      if (error) {
        console.error(error)
        process.exit(1)
      }
    })
  }
}

export function cleanAll() {
  workspaces.forEach(clean)
}
