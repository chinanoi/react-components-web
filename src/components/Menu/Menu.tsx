import React, { createContext, useState, ReactNode } from 'react';
import classNames from 'classnames';
import { IMenuItemProps } from './MenuItem';
import { useEffect } from 'react';


type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: string) => void;

export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
    children: ReactNode;
}

interface IMenuContext {
    mode?: MenuMode;
    index?: string;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

const Menu: React.FC<MenuProps> = (props) => {
    const {
        className,
        mode = 'vertical',
        style,
        defaultIndex = '0',
        children,
        defaultOpenSubMenus = [],
        onSelect
    } = props;

    const [currentActive, setCurrentActive] = useState(defaultIndex);
    const classes = classNames('baiyi-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });

    const handleClick = (index: string) => {
        setCurrentActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    };

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<IMenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );
};

export default Menu;
