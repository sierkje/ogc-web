import { KnexDatabase } from './lib/knexDb'

export class OgcWebDatabase extends KnexDatabase {
  protected isLoggingDisabled(): boolean {
    throw new Error('Method not implemented.')
  }
  protected createDB(
    config: {} & { knex: import('knex').Config<any> },
    services: {} & {
      logger?: ((db: import('knex')<any, any[]>) => void) | undefined
    }
  ): import('knex')<any, any[]> {
    throw new Error('Method not implemented.')
  }
}
