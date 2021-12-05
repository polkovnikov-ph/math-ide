import React, {FC, useMemo} from 'react';

import { Title } from './pure/title';
import { Forest } from './pure/tree';
import { useSelector } from './state';
import { typeToHandler } from './tools';

export const Properties: FC = () => {
  const {entity} = useSelector(({entities, selectedEntity}) => ({
    entity: typeof selectedEntity === 'number' ? entities[selectedEntity] : undefined
  }));

  const forest = useMemo(() => {
    if (!entity) {
      return null;
    }
    
    return typeToHandler[entity.type]
      .render('', entity.fields)
      .children;
  }, [entity]);

  return (
      <>
          <Title text="Entities" />
          {forest ? <Forest forest={forest} /> : null}
      </>
  );
};