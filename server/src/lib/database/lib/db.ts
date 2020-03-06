export type DatabaseConfig<T extends Record<string, any>> = {
  [P in keyof T]: T[P]
}

export type DatabaseServices<T extends Record<string, any>> = {
  [P in keyof T]: T[P]
}
export type DatabaseDependencies = any[]

export abstract class Database<
  DB,
  Config extends DatabaseConfig<Config>,
  Services extends DatabaseServices<Services>,
  Dependencies extends DatabaseDependencies = []
> {
  protected abstract createDB(
    config: Config,
    services: Services,
    ...dependencies: Dependencies
  ): DB

  constructor(
    config: Config,
    services: Services,
    ...dependencies: Dependencies
  ) {
    this.config = config
    this.services = services
    this.db = this.createDB(config, services, ...dependencies)
  }

  private config: Config
  private services: Services
  private db: DB

  protected getDatabase(): DB {
    return this.db
  }

  protected getService(key: keyof Services) {
    return this.services[key]
  }

  protected getConfig(key?: keyof Config | never) {
    return !key || !this.config[key] ? this.config : this.config[key]
  }
  // public static createInstance() {
  //   const self: ThisType<DatabaseInterface> = this
  //   return new self()
  // }
}

export interface DatabaseInterface<
  DB = any,
  Config extends DatabaseConfig<Config> = any,
  Services extends DatabaseServices<Services> = any,
  Dependencies extends any[] = []
> extends Database<DB, Config, Services, Dependencies> {}
