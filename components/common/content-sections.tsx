import React, { FunctionComponent, JSXElementConstructor } from 'react';
import classNames from 'classnames';

import styles from './content-sections.module.scss';

type ContentSectionsProps = {
    className?: string;
    minHeight?: string | number | undefined;
    component?: JSXElementConstructor<any> | keyof JSX.IntrinsicElements;
};

const ContentSections: FunctionComponent<ContentSectionsProps> = (props) => {
    const { className, minHeight, component: inputComponent, children } = props;
    const Component = inputComponent || ((props) => <main {...props} />);
    return (
        <Component className={classNames(styles.contentSections, className)} style={{ minHeight: minHeight }}>
            {children}
        </Component>
    );
};

export default ContentSections;
