import Knex from 'knex'

import { SQLDataSource } from './helpers/sql-datasource'

interface EntityStorageInterface {
  id(): number
}

interface PostBase {
  uuid: string
  status: boolean
  slug: string
}

interface PostFull extends PostBase {
  id: number
  revision_uuid: string
}

interface PostRevision {
  title?: string
  pinned?: boolean
  body?: string
  summary?: string
}

interface PostRevisionFull extends PostRevision {
  id: number
  uuid: string
  post_uuid: string
}

type EntityStorageList = Record<string, EntityStorageInterface>

export class Database extends SQLDataSource<{
  user?: { uuid?: string }
}> {
  entities: EntityStorageList

  constructor(
    knexConfig: Knex,
    entities: (new () => EntityStorageInterface)[]
  ) {
    super(knexConfig)
    this.entities = entities.reduce<EntityStorageList>((list, Entity) => {
      const storage = new Entity()
      const id = storage.id()
      return { ...list, [id]: storage }
    }, {})
    // Entity => new Entity()).reduce(entity => ({ id: entity.id, storage: entity})).re
  }

  private hasEntityStorage(id: string) {
    return this.entities[id] != undefined
  }

  protected getEntityStorage(id: string) {
    return this.hasEntityStorage(id) ? this.entities[id] : undefined
  }
}
