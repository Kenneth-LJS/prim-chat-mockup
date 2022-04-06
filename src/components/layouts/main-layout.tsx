import React, { FunctionComponent, ReactNode, useContext, useRef } from 'react';
import Nav from '../common/nav';
import { NAV_BRAND_HREF, getNavLinks } from '../../constants/nav-constants';
import Footer from '../common/footer';
import ContentSections from '../common/content-sections';
import { useHeight } from '../../utils/react-hooks';
import Banner from '../common/banner';
import PlatformContext from '../../context/platform-context';

import navStyles from '../../styles/components/nav.module.scss';
import styles from './main-layout.module.scss';

type MainLayoutProps = {
    header?: ReactNode;
    showFooter?: boolean | undefined;
    bannerBgSrc?: string | undefined;
};

const MainLayout: FunctionComponent<MainLayoutProps> = (props) => {
    const { header, bannerBgSrc, children, showFooter: inputShowFooter } = props;
    const showFooter = typeof inputShowFooter === 'undefined' ? true : inputShowFooter;
    const showHeader = typeof bannerBgSrc !== 'undefined';

    const platform = useContext(PlatformContext);
    const navLinks = getNavLinks(platform);

    const navRef = useRef(undefined);
    const navHeight = useHeight(navRef) || 0;
    const bannerTopPadding = (navStyles.isNavTransparent === 'true') ? navHeight : 0;

    return (
        <div className={styles.mainLayout}>
            <Nav brandHref={NAV_BRAND_HREF} links={navLinks} zIndex={1} ref={navRef}/>
            {showHeader && <header>
                <Banner bgSrc={bannerBgSrc} topPadding={bannerTopPadding}>
                    {header}
                </Banner>
            </header>}
            <ContentSections className={styles.mainLayoutContentSections}>
                {children}
            </ContentSections>
            {showFooter && <Footer/>}
        </div>
    );
};

export default MainLayout;
