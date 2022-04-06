import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './paragraph.module.scss';
import { getThemeClassName } from '../../utils/theme-utils';

type ParagraphProps = {
    className?: string;
} & HTMLAttributes<HTMLParagraphElement>;

const Paragraph: FunctionComponent<ParagraphProps> = (props) => {
    const { className: inputClassName, children, ...paragraphAttrs } = props;
    const className = classNames(
        styles.paragraph,
        getThemeClassName(styles),
        inputClassName,
    );
    return (
        <p className={className} {...paragraphAttrs}>
            {children}
        </p>
    );
};

export default Paragraph;
