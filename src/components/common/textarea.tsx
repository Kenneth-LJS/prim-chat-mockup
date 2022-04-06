import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { getThemeClassName } from '../../utils/theme-utils';

import styles from './textarea.module.scss';

type TextAreaProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> & { className?: string | undefined };

const TextArea: FunctionComponent<TextAreaProps> = (props) => {
    const className = classNames(
        styles.textarea,
        getThemeClassName(styles),
        props.className,
    );
    return <textarea {...props} className={className} />;
};

export default TextArea;
