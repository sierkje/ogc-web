import Knex from 'knex'
// @ts-ignore
import knexTinyLogger from 'knex-tiny-logger'

import { Database as Base, DatabaseInterface } from './db'

let HAS_LOGGER: boolean = false

type Logger = (db: Knex) => void

type KnexConfig<T extends Record<keyof T, any>> = { [P in keyof T]: T[P] } & {
  knex: Knex.Config
}

type KnexServices<T extends Record<keyof T, any>> = { [P in keyof T]: T[P] } & {
  logger?: Logger
}

type BaseInterface<T> = DatabaseInterface<Knex, KnexConfig<T>, {}, []>

export abstract class KnexDatabase<
  Config extends KnexConfig<Config> = KnexConfig<{}>,
  Services extends KnexServices<Services> = KnexServices<{}>
> extends Base<Knex, Config, Services> implements BaseInterface<Config> {
  protected abstract isLoggingDisabled(): boolean

  constructor(config: Config, services: Services) {
    super(config, services)

    if (!HAS_LOGGER && !this.isLoggingDisabled() && !!services.logger) {
      const { logger: createLogger } = services
      createLogger(this.getDatabase())
    }
  }

  // protected createDB({ knex: config }: Config): Knex {
  //   return Knex(config)
  // }
}

export interface KnexDatabaseInterface<Config extends KnexConfig<Config>>
  extends KnexDatabase<KnexConfig<Config>> {}
