import './title.css';

import React, {FC} from 'react';
import { bem } from '@bem-modules/bem';

const b = bem('title');

type Props = {
    text: string;
};

export const Title: FC<Props> = ({text}) => {
    return (
        <div className={b()}>
            {text}
        </div>
    );
};