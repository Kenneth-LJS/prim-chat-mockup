import { useContext } from 'react';
import ThemeContext from '../context/theme-context';

export function getThemeClassName(
    styles: Record<string, string | undefined>,
): string | undefined {
    const theme = useContext(ThemeContext);
    const themeClassName = theme
        ? (styles[`theme__${theme}`] as string | undefined)
        : undefined;

    return themeClassName;
}
