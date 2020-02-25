const fs = require('fs')
const path = require('path')
const { workspaces } = require('./workspaces')

function hasBuildFolder(workspace) {
  return fs.existsSync(path.join(__dirname, '..', '..', workspace, 'build'))
}

function needsBuild() {
  return workspaces.reduce(
    (hasMissingFolders, workspace) =>
      hasMissingFolders || !hasBuildFolder(workspace),
    false
  )
}

module.exports = { needsBuild }
