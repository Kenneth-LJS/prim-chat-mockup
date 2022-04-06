import React, { forwardRef, JSXElementConstructor, ReactNode } from 'react';
import classNames from 'classnames';
import { Theme, ThemeProvider } from '../../context/theme-context';

import styles from './content-section.module.scss';

const CONTENT_HAS_CONTAINER = styles.contentHasContainer === 'true';

export type ContentSectionLayout =
    | 'default'
    | 'background-left' // backgroundcontent on the left
    | 'background-right'; // background, with content on the right

export type ContentSectionProps = {
    className?: string;
    theme?: Theme;
    component?: JSXElementConstructor<any> | keyof JSX.IntrinsicElements;
    layout?: ContentSectionLayout;
    background?: ReactNode;
    children?: ReactNode;
};

const ContentSection = forwardRef<any, ContentSectionProps>((props, ref) => {
    const {
        className,
        theme,
        component,
        layout: inputLayout,
        background,
        children,
    } = props;

    const themeClassName = theme
        ? (styles[`theme__${theme}`] as string | undefined)
        : undefined;

    const layout = inputLayout || 'default';
    const layoutClassName = layout
        ? (styles[`layout__${layout}`] as string | undefined)
        : undefined;

    return (
        <ThemeProvider value={theme}>
            <ContentSectionWrapper
                className={classNames(
                    styles.contentSection,
                    themeClassName,
                    layoutClassName,
                    background && styles.hasBackground,
                    className
                )}
                component={component}>
                <div
                    className={classNames(
                        styles.contentSectionBox,
                        themeClassName,
                        layoutClassName,
                        background && styles.hasBackground
                    )}>
                    {children}
                </div>
                {background && (
                    <div className={styles.contentSectionBackgroundContainer}>
                        {background}
                    </div>
                )}
            </ContentSectionWrapper>
        </ThemeProvider>
    );
});

export default ContentSection;

export type ContentSectionWrapperProps = {
    className?: string;
    component?: JSXElementConstructor<any> | keyof JSX.IntrinsicElements;
    children?: ReactNode;
};

const ContentSectionWrapper = forwardRef<any, ContentSectionProps>(
    (props, ref) => {
        const { className, component: InputComponent, children } = props;
        return InputComponent ? (
            <InputComponent className={className} ref={ref}>
                {children}
            </InputComponent>
        ) : (
            <section className={className} ref={ref}>
                {children}
            </section>
        );
    }
);
