import './tree.css';

import React, {FC, ReactElement, useCallback, useState} from 'react';
import {bem} from '@bem-modules/bem';

const ROW_HEIGHT = 24;

export type ModelTree = {
    columns: (ReactElement | string)[];
    children: ModelTree[];
};

const bn = bem('tree-node');

type TreeNodeProps = ModelTree & {
    depth: number;
};

export const TreeNode: FC<TreeNodeProps> = ({columns, children, depth}) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggleOpen = useCallback(() => setIsOpen(wasOpen => !wasOpen), []);

    const icon = children.length === 0
        ? `M 50 50m -30 0 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0` // circle
        : "M50 15 L100 100 L0 100 Z"; // triangle

    const chevron = (
        <svg
            className={bn('chevron', {isOpen})} 
            onClick={handleToggleOpen}
            width="10"
            height="10"
            viewBox="0 0 100 100"
        >
            <path d={icon} />
        </svg>
    );

    const style = {
        paddingLeft: depth * ROW_HEIGHT,
    };

    return (
        <div className={bn()}>
            <div className={bn('row')} style={style}>
                {chevron}
                {columns.map((column, index) => (
                    <div className={bn('column')} key={index}>
                        {column}
                    </div>
                ))}
            </div>
            <div className={bn('children', {isClosed: !isOpen})}>
                <Forest forest={children} depth={depth + 1} />
            </div>
        </div>
    );
};

const bf = bem('forest');

type ForestProps = {
    forest: ModelTree[];
    depth?: number;
}

export const Forest: FC<ForestProps> = ({forest, depth = 0}) => {
    return (
        <div className={bf()}>
            {forest.map((tree, index) => (
                <TreeNode
                    key={index} 
                    {...tree}
                    depth={depth}
                />
            ))}
        </div>
    );
};