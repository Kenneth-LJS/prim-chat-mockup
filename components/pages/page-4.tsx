import React, { Fragment, FunctionComponent, useContext } from 'react';
import PlatformContext from '../../context/platform-context';
import { Theme } from '../../context/theme-context';
import ContentSection from '../common/content-section';
import MainLayout from '../layouts/main-layout';
import SiteHead from '../common/site-head';
import Header from '../common/header';
import P from '../common/paragraph';

import styles from './page-4.module.scss';

const IndexPage: FunctionComponent = () => {
    const platform = useContext(PlatformContext);

    return (
        <Fragment>
            <SiteHead title={'Page 4'} />
            <MainLayout
                header={<h1 className={styles.title}>Page 4</h1>}
                bannerBgSrc={'/images/header-4.jpg'}>
                {[
                    undefined,
                    'light',
                    'dark',
                    'highlight-a',
                    'highlight-b',
                    'highlight-c',
                ].map((theme, i) => {
                    const prettyThemeName =
                        typeof theme === 'undefined'
                            ? 'Default'
                            : theme
                                .split('-')
                                .map(
                                    (s) =>
                                        s.charAt(0).toUpperCase() +
                                          s.slice(1).toLowerCase(),
                                )
                                .join(' ');
                    return (
                        <ContentSection
                            key={i}
                            theme={theme as Theme | undefined}>
                            <Header className={styles.header} level={2}>
                                {prettyThemeName} Theme
                            </Header>
                            <div className={styles.body}>
                                <P>
                                    You are currently on the {platform.type}{' '}
                                    platform in {platform.mode} mode.
                                </P>
                                <P>
                                    The website platform is exported a NextJS
                                    static server, whereas the local platform is
                                    exported as offline web pages.
                                </P>
                            </div>
                        </ContentSection>
                    );
                })}
            </MainLayout>
        </Fragment>
    );
};

export default IndexPage;
