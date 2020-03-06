interface EntitySchema {
  id: number
  uuid: string
}

type DefaultValues<
  T extends EntitySchema,
  ExcludeProps extends keyof T = 'id'
> = Required<
  {
    [P in keyof Omit<T, ExcludeProps | 'id' | 'uuid'>]: T[P] | null
  }
>

interface PostSchema extends EntitySchema {
  slug: string
  revision_uuid: any
  type: string
  status: boolean
}

export const postDefaults: DefaultValues<
  PostSchema,
  'revision_uuid' | 'slug'
> = {
  type: 'post',
  status: true,
}
