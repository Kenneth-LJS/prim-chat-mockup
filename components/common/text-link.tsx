import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { getThemeClassName } from '../../utils/theme-utils';
import Link, { LinkProps } from './link';

import styles from './text-link.module.scss';

const TextLink: FunctionComponent<LinkProps> = (props) => {
    const { className: inputClassName, ...otherProps } = props;
    const className = classNames(
        styles.link,
        getThemeClassName(styles),
        inputClassName,
    );
    return <Link {...otherProps} className={className} />;
};

export default TextLink;
