import { Apply, Tag } from "../util/hkt";

export interface Schema<F extends Tag> {
    number: Apply<F, number>;
    object: <O>(types: {
        [K in keyof O]: Apply<F, O[K]>
    }) => Apply<F, O>;
}