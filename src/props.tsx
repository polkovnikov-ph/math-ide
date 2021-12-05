import React, {FC} from 'react';
import {bem} from '@bem-modules/bem';

import { Table } from './pure/table';
import { Title } from './pure/title';
import { Entity, entitySchema } from './tools';
import { Schema } from './util/schema';
import { entries } from './util/utils';

const b = bem('table'); // FIXME

type RendererT<T> = FC<T>
type Renderer = 'Renderer'
declare module './util/hkt' {
  interface Tag2Hkt<T> {
    Renderer: RendererT<T>;
  }
}
const renderer: Schema<Renderer> = {
  number: (props) => <>{props}</>,
  object: (types) => (props) => {
    const result: JSX.Element[] = [];
    for (const [key, render] of entries(types)) {
      result.push(
        <div className={b('row')} key={key}>
          <div className={b('key')}>{key}</div>
          <div className={b('value')}>{render(props[key])}</div>
        </div>
      );
    }
    return <>{result}</>;
  },
};

const renderers = entitySchema(renderer);

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
    const Render = renderers[e.type];
    const props = <Render {...e.fields} />;

    return (
        <>
            <Title text="Entities" />
            {props}
        </>
    );
};