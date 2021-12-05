import './app.css';

import React, { FC } from 'react';
import {bem} from '@bem-modules/bem';

import { EntityList } from './entity-list';
import { Properties } from './properties';
import { Editor } from './editor';

const Stub: FC<{name: string}> = ({name}) => {
  return <>{name}</>;
};

const b = bem('app');

export const App: FC = () => {
  return (
    <div className={b()}>
      <div className={b("timeline")}>
        <Stub name="Timeline" />
      </div>
      <div className={b("content")}>
        <div className={b("tree")}>
          <EntityList />
        </div>
        <div className={b("editor")}>
          <Editor />
        </div>
        <div className={b("right")}>
          <div className={b("toolbox")}>
            <Stub name="Toolbox" />
          </div>
          <div className={b("props")}>
            <Properties />
          </div>
        </div>
      </div>
    </div>
  );
};
