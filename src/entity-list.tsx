import React, {FC} from "react";
import { Title } from "./pure/title";

import {Forest, ModelTree} from './pure/tree';

const forest: ModelTree[] = [
  {
      columns: ['node_modules'],
      children: [
          {
              columns: ['react'],
              children: [
                  {
                      columns: ['index.js'],
                      children: [],
                  }
              ],
          }
      ],
  },
  {
      columns: ['src'],
      children: [
          {
              columns: ['app.css'],
              children: [],
          },
          {
              columns: ['app.tsx'],
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