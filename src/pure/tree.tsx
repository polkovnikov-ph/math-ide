import './tree.css';

import React, {FC, MouseEventHandler, ReactElement, useCallback, useState} from 'react';
import {bem} from '@bem-modules/bem';

const ROW_HEIGHT = 24;

export type ModelTree<T> = {
    columns: (ReactElement | string)[];
    children: ModelTree<T>[];
    isSelected: boolean;
    value: T;
};

const bn = bem('tree-node');

type TreeNodeProps<T> = ModelTree<T> & {
    depth: number;
    onClick: (entityId: T) => void;
};

export const TreeNode = <T,>({isSelected, columns, children, value, onClick, depth}: TreeNodeProps<T>) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggleOpen = useCallback<MouseEventHandler>((e) => {
        e.stopPropagation();
        setIsOpen(wasOpen => !wasOpen);
    }, []);

    const handleClick = useCallback(() => {
        onClick(value);
    }, []);

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
        <div className={bn({isSelected})}>
            <div className={bn('row')} style={style} onClick={handleClick}>
                {chevron}
                {columns.map((column, index) => (
                    <div className={bn('column')} key={index}>
                        {column}
                    </div>
                ))}
            </div>
            <div className={bn('children', {isClosed: !isOpen})}>
                <Forest
                    forest={children}
                    onClick={onClick}
                    depth={depth + 1}
                />
            </div>
        </div>
    );
};

const bf = bem('forest');

type ForestProps<T> = {
    forest: ModelTree<T>[];
    depth?: number;
    onClick: (entityId: T) => void;
}

export const Forest = <T,>({forest, onClick, depth = 0}: ForestProps<T>) => {
    return (
        <div className={bf()}>
            {forest.map((tree, index) => (
                <TreeNode<T>
                    key={index} 
                    {...tree}
                    onClick={onClick}
                    depth={depth}
                />
            ))}
        </div>
    );
};