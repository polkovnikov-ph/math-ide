import './title.css';

import React, {FC, memo} from 'react';
import { bem } from '@bem-modules/bem';

const b = bem('title');

type Props = {
    text: string;
};

const Title: FC<Props> = ({text}) => {
    return (
        <div className={b()}>
            {text}
        </div>
    );
};

const WrappedTitle = memo(Title);
export {WrappedTitle as Title};