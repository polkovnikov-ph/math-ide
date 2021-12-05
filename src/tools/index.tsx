import { Tag } from "../util/hkt";
import { Schema } from "../util/schema";
import * as line from './line';

export const entitySchema = <F extends Tag>(s: Schema<F>) => ({
    line: line.schema(s),
});

type IdentityT<T> = T
type Identity = 'Identity'
declare module '../util/hkt' {
    interface Tag2Hkt<T> {
        Identity: IdentityT<T>;
    }
}
const getSchema = () => entitySchema({} as unknown as Schema<Identity>);
type Entity1 = ReturnType<typeof getSchema>
export type Entity = { [K in keyof Entity1]: { type: K, fields: Entity1[K] } }[keyof Entity1]