import React, {FC, useMemo} from 'react';

import { Title } from './pure/title';
import { Forest } from './pure/tree';
import { Entity, entitySchema } from './tools';
import { handlers } from './util/types';

const renderers = entitySchema(handlers);

const entities: Entity[] = [
    {
        type: 'line',
        fields: {
            x1: 100,
            y1: 100,
            x2: 200,
            y2: 200,
        },
    },
];

const selectedEntity = 0;

export const Props: FC = () => {
    const e = entities[selectedEntity];
    const {render} = renderers[e.type];

    const forest = useMemo(() => {
      return render('', e.fields).children;
    }, [e.fields, render]);

    return (
        <>
            <Title text="Entities" />
            <Forest forest={forest} />
        </>
    );
};