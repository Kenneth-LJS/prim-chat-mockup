import React, { Fragment, FunctionComponent, useState } from 'react';
import SiteHead from '../common/site-head';
import ContentSections from '../common/content-sections';
import P from '../common/paragraph';
import { Theme } from '../../context/theme-context';
import ContentSection from '../common/content-section';
import Header from '../common/header';

import styles from './demo-content-section.module.scss';
import demoStyles from './demo-common.module.scss';

const Page: FunctionComponent = () => {
    return (
        <Fragment>
            <SiteHead title={'Demo - Theme'} noTitlePrefix={true} />
            <ContentSections className={(demoStyles.container, styles.body)}>
                {(
                    [
                        undefined,
                        'light',
                        'dark',
                        'highlight-a',
                        'highlight-b',
                        'highlight-c',
                    ] as (Theme | undefined)[]
                ).map((theme, i) => {
                    return (
                        <ContentSection
                            key={i}
                            theme={theme}
                            className={styles.body}>
                            <Header className={styles.header} level={2}>
                                Theme
                            </Header>
                            <P>Hello!</P>
                            <P>
                                The website platform is exported a NextJS static
                                server, whereas the local platform is exported
                                as offline web pages.
                            </P>
                        </ContentSection>
                    );
                })}
                <ContentSection className={styles.body} background={<div className={styles.background1}/>}>
                    <Header className={styles.header} level={2}>
                        Theme
                    </Header>
                    <P>Hello!</P>
                    <P>
                        The website platform is exported a NextJS static server,
                        whereas the local platform is exported as offline web
                        pages.
                    </P>
                </ContentSection>
                <ContentSection className={styles.body} background={<div className={styles.background2}/>}>
                    <Header className={styles.header} level={2}>
                        Theme
                    </Header>
                    <P>Hello!</P>
                    <P>
                        The website platform is exported a NextJS static server,
                        whereas the local platform is exported as offline web
                        pages.
                    </P>
                </ContentSection>
            </ContentSections>
        </Fragment>
    );
};

export default Page;
