import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './header.module.scss';
import { getThemeClassName } from '../../utils/theme-utils';

type HeaderProps = {
    className?: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    themeLevel?:
        | 'title'
        | 'subtitle'
        | 'header-1'
        | 'header-2'
        | 'header-3'
        | 'header-4'
        | 'header-5'
        | 'header-6'
        | undefined;
} & HTMLAttributes<HTMLHeadingElement>;

const Header: FunctionComponent<HeaderProps> = (props) => {
    const {
        className: inputClassName,
        level,
        themeLevel: inputThemeLevel,
        children,
        ...headingAttrs
    } = props;
    const themeLevel =
        typeof inputThemeLevel === 'undefined'
            ? `header-${level}`
            : inputThemeLevel;

    const className = classNames(
        styles[themeLevel],
        getThemeClassName(styles),
        inputClassName,
    );
    const allAttrs = { className, ...headingAttrs };
    const HeaderC = getHeaderComponent(level);
    return <HeaderC {...allAttrs}>{children}</HeaderC>;
};

function getHeaderComponent(level: 1 | 2 | 3 | 4 | 5 | 6) {
    if (level === 1) {
        return ({ children, ...attrs }) => <h1 {...attrs}>{children}</h1>;
    } else if (level === 2) {
        return ({ children, ...attrs }) => <h2 {...attrs}>{children}</h2>;
    } else if (level === 3) {
        return ({ children, ...attrs }) => <h3 {...attrs}>{children}</h3>;
    } else if (level === 4) {
        return ({ children, ...attrs }) => <h4 {...attrs}>{children}</h4>;
    } else if (level === 5) {
        return ({ children, ...attrs }) => <h5 {...attrs}>{children}</h5>;
    } else if (level === 6) {
        return ({ children, ...attrs }) => <h6 {...attrs}>{children}</h6>;
    }
}

export default Header;
