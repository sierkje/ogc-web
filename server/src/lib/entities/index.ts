import { DataSource } from 'apollo-datasource'

import { DatabaseInterface } from '../database/lib/db'

export type Entities = () => Record<string, DataSource>

export default function getEntities(db: DatabaseInterface): Entities {
  return () => ({})
}
