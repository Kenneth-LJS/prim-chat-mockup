import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import Input from './input';
import TextArea from './textarea';
import Select from './select';
import AsyncSelect from './async-select';

import styles from './input-field.module.scss';

type InputFieldProps = InputFieldCommonProps & PartialInputFieldProps;

interface InputFieldCommonProps {
    className?: string;
    label: string;
    inputClassName?: string;
    disabled?: boolean;
}

type PartialInputFieldProps =
    | PartialInputFieldProps_Text
    | PartialInputFieldProps_TextArea
    | PartialInputFieldProps_Number
    | PartialInputFieldProps_Select
    | PartialInputFieldProps_AsyncSelect
    | PartialInputFieldProps_Color
    | PartialInputFieldProps_File;

interface PartialInputFieldProps_Text {
    type?: 'text';
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface PartialInputFieldProps_TextArea {
    type: 'textarea';
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface PartialInputFieldProps_Number {
    type?: 'number';
    value: number | string;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface PartialInputFieldProps_Select {
    type: 'select';
    options: any;
    value: any;
    onChange?: (option: any) => void;
    [key: string]: any;
}

interface PartialInputFieldProps_AsyncSelect {
    type: 'async-select';
    value: any;
    onChange?: (option: any) => void;
    [key: string]: any;
}

interface PartialInputFieldProps_Color {
    type: 'color';
    value: any;
    onChange?: (option: React.ChangeEvent<HTMLInputElement>) => void;
}

interface PartialInputFieldProps_File {
    type: 'file';
    value: any;
    onChange?: (option: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FunctionComponent<InputFieldProps> = (props) => {
    const { className: propClassName, label } = props;

    const className = classNames(styles.inputField, propClassName);

    let fieldComponent;
    if (!props.type || props.type == 'text') {
        // @ts-ignore
        fieldComponent = <TextInputField {...props} />;
    } else if (props.type == 'textarea') {
        fieldComponent = <TextAreaInputField {...props} />;
    } else if (props.type == 'number') {
        fieldComponent = <NumberInputField {...props} />;
    } else if (props.type == 'select') {
        fieldComponent = <SelectInputField {...props} />;
    } else if (props.type == 'async-select') {
        fieldComponent = <AsyncSelectInputField {...props} />;
    } else if (props.type == 'color') {
        fieldComponent = <ColorInputField {...props} />;
    } else if (props.type == 'file') {
        fieldComponent = <FileInputField {...props} />;
        // } else if (props.type == 'checkbox') {
        //     throw 'Not implemented';
    }

    return (
        <div className={className}>
            <div className={styles.inputFieldLabel}>{label}</div>
            {fieldComponent}
        </div>
    );
};

type TextInputFieldProps = InputFieldCommonProps & PartialInputFieldProps_Text;
const TextInputField: FunctionComponent<TextInputFieldProps> = (props) => {
    const { inputClassName, value, onChange, disabled } = props;
    return <input className={inputClassName} value={value} onChange={onChange} disabled={disabled} />;
};

type TextAreaInputFieldProps = InputFieldCommonProps & PartialInputFieldProps_TextArea;
const TextAreaInputField: FunctionComponent<TextAreaInputFieldProps> = (props) => {
    const { inputClassName, value, onChange, disabled } = props;
    return <TextArea className={inputClassName} value={value} onChange={onChange} disabled={disabled} />;
};

type NumberInputFieldProps = InputFieldCommonProps & PartialInputFieldProps_Number;
const NumberInputField: FunctionComponent<NumberInputFieldProps> = (props) => {
    const { inputClassName, value, min, max, step, onChange, disabled } = props;
    return (
        <Input
            className={inputClassName}
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

type SelectInputFieldProps = InputFieldCommonProps & PartialInputFieldProps_Select;
const SelectInputField: FunctionComponent<SelectInputFieldProps> = (props) => {
    const { inputClassName, disabled, ...otherProps } = props;
    return <Select className={inputClassName} isDisabled={disabled} {...otherProps} />;
};

type AsyncSelectInputFieldProps = InputFieldCommonProps & PartialInputFieldProps_AsyncSelect;
const AsyncSelectInputField: FunctionComponent<AsyncSelectInputFieldProps> = (props) => {
    const { inputClassName, disabled, ...otherProps } = props;
    return <AsyncSelect className={inputClassName} isDisabled={disabled} {...otherProps} />;
};

type ColorInputFieldProps = InputFieldCommonProps & PartialInputFieldProps_Color;
const ColorInputField: FunctionComponent<ColorInputFieldProps> = (props) => {
    const { inputClassName, value, onChange, disabled } = props;
    return <Input className={inputClassName} type="color" value={value} onChange={onChange} disabled={disabled} />;
};

type FileInputFieldProps = InputFieldCommonProps & PartialInputFieldProps_File;
const FileInputField: FunctionComponent<FileInputFieldProps> = (props) => {
    const { inputClassName, value, onChange, disabled } = props;
    return <Input className={inputClassName} type="file" value={value} onChange={onChange} disabled={disabled} />;
};

export default InputField;
