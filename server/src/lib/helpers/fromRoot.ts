import path from 'path'

export default function fromRoot(...segments: string[]) {
  return path.join(__dirname, '..', '..', '..', ...segments)
}
