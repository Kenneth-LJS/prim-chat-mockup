import { createContext, Fragment, FunctionComponent } from 'react';

export type Theme =
    | 'default'
    | 'light'
    | 'dark'
    | 'highlight-a'
    | 'highlight-b'
    | 'highlight-c';
const ThemeContext = createContext('default' as Theme);

export const ThemeProvider: FunctionComponent<{ value?: Theme }> = ({
    value,
    children,
}) => {
    return typeof value === 'undefined' ? (
        <Fragment>{children}</Fragment>
    ) : (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export default ThemeContext;
