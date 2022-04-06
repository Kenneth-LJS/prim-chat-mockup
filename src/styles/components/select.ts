import cTheme from '../constants/theme.module.scss';
import cFE from '../constants/form-elements.module.scss';
import { Theme } from '../../context/theme-context';

const allThemeColorsStr = cTheme.allThemeColors.substring(
    1,
    cTheme.allThemeColors.length - 1,
);
const allThemeColors = JSON.parse(allThemeColorsStr) as {
    'theme'
};

type ElemStyle = {
    color: string;
    'border-color': string;
    'background-color': string;
};

type ReactSelectStyle = any;

function initReactSelectStyle(theme: Theme, isDisabled: boolean): ReactSelectStyle {
    const elemStyle = allThemeColors[theme][
        isDisabled ? 'select:disabled' : 'select'
    ] as ElemStyle;
    const elemHoverStyle = allThemeColors[theme][
        isDisabled ? 'select:disabled' : 'select:hover'
    ] as ElemStyle;
    const elemItemStyle = allThemeColors[theme]['select-item'] as ElemStyle;
    const elemItemHoverStyle = allThemeColors[theme]['select-item:hover'] as ElemStyle;

    return {
        control: (providedStyle: any): any => ({
            ...providedStyle,
            borderRadius: cFE.elemBorderRadius,
            padding: `${cFE.elemPaddingTop} ${cFE.selectIndicatorRight} ${cFE.elemPaddingBottom} ${cFE.elemPaddingLeft}`,
            backgroundColor: elemStyle['background-color'],
            borderWidth: isDisabled
                ? cFE.elemDisabledBorderWidth
                : cFE.elemBorderWidth,
            borderStyle: isDisabled
                ? cFE.elemDisabledBorderStyle
                : cFE.elemBorderStyle,
            borderColor: elemStyle['border-color'],
            boxShadow: undefined,
            '&:hover': {
                backgroundColor: elemHoverStyle['background-color'],
                borderWidth: isDisabled
                    ? cFE.elemDisabledBorderWidth
                    : cFE.elemHoverBorderWidth,
                borderStyle: isDisabled
                    ? cFE.elemDisabledBorderStyle
                    : cFE.elemHoverBorderStyle,
                borderColor: elemHoverStyle['border-color'],
            },
            transition: `all ${cFE.elemTransitionDuration}`,
        }),
        valueContainer: (providedStyle: any): any => ({
            ...providedStyle,
            padding: undefined,
        }),
        placeholder: (providedStyle: any): any => ({
            ...providedStyle,
            fontSize: cFE.elemFontSize,
            fontFamily: cFE.elemFontFamily,
            fontWeight: cFE.elemFontWeight,
            lineHeight: cFE.elemLineHeight,
            color: elemStyle['color'],
            opacity: 0.5,
            margin: 0,
            '&:hover': {
                color: elemHoverStyle['color'],
            },
        }),
        input: (providedStyle: any): any => ({
            ...providedStyle,
            fontSize: cFE.elemFontSize,
            fontFamily: cFE.elemFontFamily,
            fontWeight: cFE.elemFontWeight,
            lineHeight: cFE.elemLineHeight,
            color: elemStyle['color'],
            padding: '0',
            margin: '0',
            '*': {
                fontSize: cFE.elemFontSize,
                fontFamily: cFE.elemFontFamily,
                fontWeight: cFE.elemFontWeight,
                lineHeight: cFE.elemLineHeight,
                color: elemStyle['color'],
            },
            '&:hover': {
                color: elemHoverStyle['color'],
            },
            '*:hover': {
                color: elemHoverStyle['color'],
            },
            transition: `all ${cFE.elemTransitionDuration}`,
        }),
        noOptionsMessage: (providedStyle: any): any => ({
            ...providedStyle,
            fontSize: cFE.elemFontSize,
            fontFamily: cFE.elemFontFamily,
            fontWeight: cFE.elemFontWeight,
            lineHeight: cFE.elemLineHeight,
            color: elemStyle['color'],
            opacity: 0.5,
        }),
        indicatorsContainer: (providedStyle: any): any => ({
            ...providedStyle,
            padding: 0,
        }),
        indicatorSeparator: (): any => ({
            display: 'none',
        }),
        dropdownIndicator: (providedStyle: any): any => ({
            ...providedStyle,
            color: elemStyle['color'],
            '&:hover': {
                color: elemHoverStyle['color'],
            },
            padding: 0,
        }),
        menu: (providedStyle: any): any => ({
            ...providedStyle,
            fontSize: cFE.elemFontSize,
            fontFamily: cFE.elemFontFamily,
            fontWeight: cFE.elemFontWeight,
            lineHeight: cFE.elemLineHeight,
            color: elemStyle['color'],
            backgroundColor: elemStyle['background-color'],
            marginTop: cFE.selectOptionsGap,
            borderWidth: cFE.elemBorderWidth,
            borderStyle: cFE.elemBorderStyle,
            borderColor: elemStyle['border-color'],
            borderRadius: cFE.elemBorderRadius,
            boxShadow: undefined,
            overflow: 'hidden',
            transition: `all ${cFE.elemTransitionDuration}`,
        }),
        menuList: (): any => ({
            overflow: 'auto',
            maxHeight: '400px',
        }),
        group: (providedStyle: any): any => ({
            // Not styled to fit the themes
            ...providedStyle,
            padding: 0,
            ':not(:last-child)': {
                borderWidth: cFE.elemBorderWidth,
                borderStyle: cFE.elemBorderStyle,
                borderBottomColor: elemStyle['border-color'],
            },
            transition: `all ${cFE.elemTransitionDuration}`,
        }),
        groupHeading: (providedStyle: any): any => ({
            // Not styled to fit the themes
            ...providedStyle,
            fontFamily: '\'Cinzel\', sans-serif',
            fontSize: '18px',
            color: elemStyle['color'],
            padding: `${cFE.elemPaddingTop} ${cFE.elemPaddingRight} ${cFE.elemPaddingBottom} ${cFE.elemPaddingLeft}`,
            margin: 0,
        }),
        option: (providedStyle: any, state: any): any => ({
            ...providedStyle,
            fontSize: cFE.elemFontSize,
            fontFamily: cFE.elemFontFamily,
            fontWeight: cFE.elemFontWeight,
            lineHeight: cFE.elemLineHeight,
            padding: `${cFE.elemPaddingTop} ${cFE.elemPaddingRight} ${cFE.elemPaddingBottom} ${cFE.elemPaddingLeft}`,
            color:
                state.isFocused || state.isSelected
                    ? elemItemHoverStyle['color']
                    : elemItemStyle['color'],
            backgroundColor:
                state.isFocused || state.isSelected
                    ? elemItemHoverStyle['background-color']
                    : elemItemStyle['background-color'],
            ':active': {
                color: elemItemHoverStyle['color'],
                backgroundColor: elemItemHoverStyle['background-color'],
            },
            transition: `all ${cFE.elemTransitionDuration}`,
        }),
        singleValue: (providedStyle: any): any => ({
            ...providedStyle,
            fontSize: cFE.elemFontSize,
            fontFamily: cFE.elemFontFamily,
            fontWeight: cFE.elemFontWeight,
            lineHeight: cFE.elemLineHeight,
            color: elemHoverStyle['color'],
            margin: 0,
            transition: `all ${cFE.elemTransitionDuration}`,
        }),
        multiValue: (providedStyle: any): any => ({
            // Not styled to fit the themes
            ...providedStyle,
            borderWidth: cFE.elemBorderWidth,
            borderStyle: cFE.elemBorderStyle,
            borderColor: 'rgba(213, 213, 213, 0.5)', // 'rgba(#D5D5D5, 0.5)'
            borderRadius: '5px',
            backgroundColor: 'transparent',
            overflow: 'hidden',
            margin: '2px',
            '&:nth-last-of-type(2)': {
                margin: '2px 8px 2px 2px',
            },
        }),
        multiValueLabel: (providedStyle: any): any => ({
            // Not styled to fit the themes
            ...providedStyle,
            fontSize: cFE.elemFontSize,
            fontFamily: cFE.elemFontFamily,
            fontWeight: cFE.elemFontWeight,
            lineHeight: cFE.elemLineHeight,
            color: elemStyle['color'],
            padding: '4px 4px 4px 6px',
            paddingLeft: undefined,
        }),
        multiValueRemove: (providedStyle: any): any => ({
            // Not styled to fit the themes
            ...providedStyle,
            color: elemStyle['color'],
            padding: '0 4px 0 1px',
            backgroundColor: 'transparent',
            ':hover': {
                backgroundColor: '#1A1A1A',
            },
            ':focus': {
                backgroundColor: '#1A1A1A',
            },
        }),
    } as ReactSelectStyle;
}

const selectStyleCache = {} as {
    [theme: string]: {
        'enabled'?: ReactSelectStyle,
        'disabled'?: ReactSelectStyle,
    };
};

export function getReactSelectStyle(theme: Theme, isDisabled: boolean) {
    if (!Object.prototype.hasOwnProperty.call(selectStyleCache, theme)) {
        selectStyleCache[theme] = {};
    }
    const enabledKey = isDisabled ? 'disabled' : 'enabled';
    if (!Object.prototype.hasOwnProperty.call(selectStyleCache[theme], enabledKey)) {
        selectStyleCache[theme][enabledKey] = initReactSelectStyle(
            theme,
            isDisabled,
        );
    }
    return selectStyleCache[theme][enabledKey];
}
