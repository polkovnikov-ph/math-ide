export interface Tag2Hkt<T> {}
export type Tag = keyof Tag2Hkt<any>
export type Apply<F extends Tag, T> = Tag2Hkt<T>[F]