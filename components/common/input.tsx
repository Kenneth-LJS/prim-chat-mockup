import React, { FunctionComponent, HTMLInputTypeAttribute, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Property } from 'csstype';
import { getThemeClassName } from '../../utils/theme-utils';

import styles from './input.module.scss';

const disabledColorInputBackgroundColor = '#333333';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    className?: string | undefined;
    type?: 'color' | 'file' | HTMLInputTypeAttribute | undefined;
};

const Input: FunctionComponent<InputProps> = (props) => {
    const { className: inputClassName, ...attrs } = props;
    if (props.type == 'color') {
        return <InputColor className={props.className} {...attrs} />;
    } else if (props.type == 'file') {
        return <InputFile className={props.className} {...attrs} />;
    }
    const className = classNames(
        styles.input,
        getThemeClassName(styles),
        inputClassName,
    );
    return <input {...attrs} className={className} />;
};

const InputColor: FunctionComponent<InputProps> = (props) => {
    const className = classNames(styles.inputColor, props.className);

    const [value, setValue] = useState(props.value);
    useEffect(() => {
        if (value != props.value) {
            setValue(props.value);
        }
    }, [props.value]);

    return (
        <label
            className={className}
            style={{
                backgroundColor: (props.disabled
                    ? disabledColorInputBackgroundColor
                    : value) as Property.BackgroundColor,
            }}
        >
            <input {...props} className={styles.inputColorInput} />
        </label>
    );
};

const InputFile: FunctionComponent<InputProps> = (props) => {
    const className = classNames(styles.inputFile, props.className);
    const value = props.value ? props.value.toString().split('\\').pop() : 'Choose image file...';
    return (
        <label className={className}>
            {value}
            <input {...props} className={styles.inputFileInput} />
        </label>
    );
};

export default Input;
