import './app.css';

import React, { FC } from 'react';
import {bem} from '@bem-modules/bem';
import { EntityList } from './entity-list';
import { Props } from './props';

const Timeline = () => {
  return <>Timeline</>;
};

const Toolbox = () => {
  return <>Toolbox</>;
};

const Editor = () => {
  return <>Editor</>;
};

const b = bem('app');

export const App: FC = () => {
  return (
    <div className={b()}>
      <div className={b("timeline")}>
        <Timeline />
      </div>
      <div className={b("content")}>
        <div className={b("tree")}>
          <EntityList />
        </div>
        <div className={b("editor")}>
          <svg width="1000" height="1000">
            <circle cx="100" cy="100" r="50" />
            {/* <Circle /> */}
          </svg>
          <Editor />
        </div>
        <div className={b("right")}>
          <div className={b("toolbox")}>
            <Toolbox />
          </div>
          <div className={b("props")}>
            <Props />
          </div>
        </div>
      </div>
    </div>
  );
};
