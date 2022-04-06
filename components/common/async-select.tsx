import React, { FunctionComponent, useContext } from 'react';
import ReactAsyncSelect from 'react-select/async';
import ThemeContext from '../../context/theme-context';
import { getReactSelectStyle } from '../../styles/components/select';

// Library: https://react-select.com/home

const AsyncSelect: FunctionComponent<any> = (props) => {
    const { disabled, ...otherProps } = props;
    const theme = useContext(ThemeContext);
    const styles = getReactSelectStyle(theme, disabled);
    return (
        <ReactAsyncSelect
            isDisabled={!!disabled}
            styles={styles}
            {...otherProps}
        />
    );
};

export default AsyncSelect;
