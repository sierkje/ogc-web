import { API, APP, SERVER, Workspace, workspaces } from './workspaces'
import { yarn } from './yarn'

const babelTask: [string, ...string[]] = [
  'babel',
  'src',
  '--out-dir',
  'build',
  '--extensions',
  '.ts',
]
const reactTask: [string, ...string[]] = ['react-scripts', 'build']
const buildTasks: Record<Workspace, [string, ...string[]]> = {
  [API]: babelTask,
  [APP]: reactTask,
  [SERVER]: babelTask,
}

const tscTask: [string, ...string[]] = [
  'tsc',
  '--declaration',
  'true',
  '--noEmit',
  'false',
  '--emitDeclarationOnly',
  'true',
  '--declarationDir',
  'build',
]

export function build(workspace: Workspace) {
  console.log(`Compiling ${workspace.toUpperCase()} files.`)
  yarn(workspace, ...buildTasks[workspace])
  if (workspace !== APP) {
    console.log(`Emitting ${workspace.toUpperCase()} type declarations.`)
    yarn(workspace, ...tscTask)
  }
}

export function buildAll() {
  workspaces.forEach(build)
}
