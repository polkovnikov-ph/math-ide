import React, {FC} from "react";
import { Title } from "./pure/title";

import {Forest, ModelTree} from './pure/tree';

const forest: ModelTree[] = [
  {
      text: 'node_modules',
      children: [
          {
              text: 'react',
              children: [
                  {
                      text: 'index.js',
                      children: [],
                  }
              ],
          }
      ],
  },
  {
      text: 'src',
      children: [
          {
              text: 'app.css',
              children: [],
          },
          {
              text: 'app.tsx',
              children: [],
          },
      ],
  },
];

export const EntityList: FC = () => (
    <>
        <Title text="Entities" />
        <Forest forest={forest} />
    </>
);