import React, { Fragment, FunctionComponent, useContext, useRef } from 'react';
import { NAV_BRAND_HREF, NAV_LINKS } from '../../constants/nav-constants';
import PlatformContext from '../../context/platform-context';
import { useHeight } from '../../utils/react-hooks';
import Nav from '../common/nav';
import SiteHead from '../common/site-head';

import styles from './index.module.scss';

const IndexPage: FunctionComponent = () => {
    const platform = useContext(PlatformContext);

    function toTitleCase(str: string): string {
        if (str.length === 0) { return ''; }
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    }

    const navPlaceholderRef = useRef(undefined);
    const navPlaceholderHeight = useHeight(navPlaceholderRef) || 0;

    return (
        <Fragment>
            <SiteHead/>
            <Nav brandHref={NAV_BRAND_HREF} links={NAV_LINKS} zIndex={1} placeholderRef={navPlaceholderRef}/>
            <div className={styles.indexPage} style={{ height: `calc(100vh - ${navPlaceholderHeight}px)` }}>
                <div className={styles.background} />
                <div className={styles.contentContainer}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>BRAND NAME</h1>
                        <h1 className={styles.subtitle}>
                            {toTitleCase(platform.type)} Platform ({toTitleCase(platform.mode)} Mode)
                        </h1>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default IndexPage;
