type Fn<
  T extends {
    [k in string]: (...m: any[]) => any
  },
> = <const U extends keyof T>(
  ...args: [U, ...Parameters<T[U]>]
) => ReturnType<T[U]>
type FnRecord = {
  [k in string]: (...a: any[]) => Promise<any>
}

export const combineFns = <const T extends FnRecord>(map: T): Fn<T> =>
  ((type, ...args) => map[type](...args)) as Fn<T>
