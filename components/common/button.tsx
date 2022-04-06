import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { getThemeClassName } from '../../utils/theme-utils';

import styles from './button.module.scss';

type ButtonProps = {
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FunctionComponent<ButtonProps> = (props) => {
    const { className: inputClassName, children, ...buttonAttrs } = props;
    const className = classNames(
        styles.button,
        getThemeClassName(styles),
        inputClassName,
    );
    return (
        <button className={className} {...buttonAttrs}>
            {children}
        </button>
    );
};

export default Button;
