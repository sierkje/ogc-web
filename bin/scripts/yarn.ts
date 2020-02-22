import { sync as spawn } from 'cross-spawn'

import { Workspace } from './workspaces'

export function yarn(workspace: Workspace, command: string, ...args: string[]) {
  const task = [`workspace`, `ogc-web-${workspace}`, command, ...args]
  spawn('yarn', task, { stdio: 'inherit' })
}
