import { ModelTree } from "../pure/tree";
import { entries } from '../util/utils';

export interface Handler<T> {
    render: (field: string, value: T) => ModelTree;
}

export interface Schema {
    number: Handler<number>;
    object: <O>(types: {
        [K in keyof O]: Handler<O[K]>
    }) => Handler<O>;
}

export type GetType<S extends (...args: any[]) => any> = ReturnType<S> extends Handler<infer T> ? T : never

export const handlers: Schema = {
    number: {
        render: (field, n) => ({
            columns: [field, String(n)],
            children: [],
        })
    },
    object: (types) => ({
        render: (field, props) => ({
            columns: [field, '{...}'],
            children: entries(types).map(([key, {render}]) => (
                render(key, props[key])
            )),
        })
    }),
};
  