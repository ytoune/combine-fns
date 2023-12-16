type Fn<T extends { readonly [k in string]: (m: any, s: any) => any }> = <
  const U extends keyof T,
>(
  ...args: [Parameters<T[U]>[0], { readonly type: U } & Parameters<T[U]>[1]]
) => ReturnType<T[U]>

type FnRecord<P> = {
  readonly [k in string]: (p: P, a: any) => P
}

export const combineReducers =
  <P>() =>
  <const T extends FnRecord<P>>(map: T): Fn<T> =>
    ((a, p) => map[p.type](a, p)) as Fn<T>
