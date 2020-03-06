export function identity<T>(value: T): T {
  return value
}

type BooleanFn = (value: boolean | number | string) => boolean | number | string

export function not(value1: any): (value2: any) => boolean {
  return (value2: any) => value1 !== value2
}
