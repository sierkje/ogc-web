import { DataSource } from 'apollo-datasource'
import Knex from 'knex'
// @ts-ignore
import knexTinyLogger from 'knex-tiny-logger'

import { not } from './functional'

let hasLogger = false

const tables: Record<'missing' | 'found' | 'looking', string[]> = {
  missing: [],
  found: [],
  looking: [],
}

function keepLookingForTable(): void {
  if (tables.looking.includes(name)) {
    return keepLookingForTable()
  }
}

export class SQLDataSource<Context> extends DataSource<Context> {
  protected db: Knex<any, unknown[]> & { cache?: (ttl: number) => any }
  protected context?: Context

  constructor(knexConfig: Knex.Config) {
    super()
    this.db = Knex(knexConfig)
  }

  initialize(config: { context: Context }) {
    this.context = config.context

    // Add a logging utility for debugging
    if (DEBUG && !hasLogger) {
      // Prevent duplicate loggers
      hasLogger = true
      knexTinyLogger(this.db)
    }
  }

  getContext() {
    return this.context
  }

  private ensureTable<T = any, Y = string>(
    name: Y & string,
    qb: (name: Y) => T & Knex.QueryBuilder
  ): T {
    return qb(name)
  }

  getTable<Entity>(name: string) {
    if (!tables.found.includes(name)) {
      if (!tables.missing.includes(name)) {
        this.db.schema.hasTable(name).then(result => {
          tables.looking = [...tables.looking.filter(not(name))]
          if (!result) {
            tables.missing = [...tables.missing, name]
            throw new Error(`Table ${name} does not exist.`)
          } else {
            tables.found = [...tables.found, name]
          }
        })
        keepLookingForTable()
      }
    }

    return tables.found.includes(name)
      ? this.ensureTable(name, _ => this.db<Entity>(_))
      : undefined
  }
}
