export const entries = Object.entries as (<O>(o: O) => {
    [K in Extract<keyof O, string>]: [K, O[K]]
}[Extract<keyof O, string>][]);

export type ValuesOf<T> = T[keyof T]