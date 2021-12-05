import './table.css';

import React, {FC} from 'react';
import {bem} from '@bem-modules/bem';

const b = bem('table');

export const Table: FC = () => {
    return (
        <div className={b()}>
            <div className={b('row')}>
                <div className={b('key')}>Color</div>
                <div className={b('value')}>#000000</div>
            </div>
            <div className={b('row')}>
                <div className={b('key')}>X</div>
                <div className={b('value')}>0</div>
            </div>
        </div>
    );
};
