import React, { FunctionComponent, useContext } from 'react';
import ReactSelect from 'react-select';
import ThemeContext from '../../context/theme-context';
import { getReactSelectStyle } from '../../styles/components/select';

// Library: https://react-select.com/home

const Select: FunctionComponent<any> = (props) => {
    const { disabled, ...otherProps } = props;
    const theme = useContext(ThemeContext);
    const styles = getReactSelectStyle(theme, disabled);
    return (
        <ReactSelect
            isDisabled={!!disabled}
            styles={styles}
            {...otherProps}
        />
    );
};

export default Select;
