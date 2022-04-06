import React, { Fragment, FunctionComponent, useState } from 'react';
import SiteHead from '../common/site-head';
import ContentSections from '../common/content-sections';
import P from '../common/paragraph';
import { Theme } from '../../context/theme-context';
import ContentSection from '../common/content-section';
import Header from '../common/header';
import TextLink from '../common/text-link';
import Button from '../common/button';
import Input from '../common/input';
import TextArea from '../common/textarea';
import Select from '../common/select';

import styles from './demo-theme.module.scss';
import demoStyles from './demo-common.module.scss';
import Dialog from '../common/dialog';

const selectOptions = [
    { value: 'option-1', label: 'Option 1' },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3' },
];

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
                    const [isDialogOpen, setIsDialogOpen] = useState(false);
                    return (
                        <ContentSection key={i} theme={theme}>
                            <Header className={styles.header} level={2}>
                                {prettyThemeName} Theme
                            </Header>
                            <div className={styles.body}>
                                <P>Hello!</P>
                                <P>
                                    The website platform is exported a NextJS
                                    static server, whereas the local platform is
                                    exported as offline web pages.
                                </P>
                                <P>
                                    <TextLink href={'#'}>Hyperlink</TextLink>
                                </P>
                                <P className={styles.inlineContainer}>
                                    <Button>Button</Button>
                                    <Button disabled>Disabled Button</Button>
                                </P>
                                <P className={styles.inlineContainer}>
                                    <Input defaultValue={'Input'} />
                                    <Input
                                        defaultValue={'Disabled Input'}
                                        disabled
                                    />
                                </P>
                                <P className={styles.inlineContainer}>
                                    <Select options={selectOptions} />
                                    <Select options={selectOptions} disabled />
                                </P>
                                <P className={styles.inlineContainer}>
                                    <TextArea defaultValue={'Input'} />
                                    <TextArea
                                        defaultValue={'Disabled Input'}
                                        disabled
                                    />
                                </P>
                                <P>
                                    <Button
                                        onClick={() => setIsDialogOpen(true)}>
                                        Click to open dialog
                                    </Button>
                                    <Dialog
                                        isOpen={isDialogOpen}
                                        onClose={() =>
                                            setIsDialogOpen(false)
                                        }
                                        onExternalClick={() =>
                                            setIsDialogOpen(false)
                                        }>
                                        <Header
                                            className={styles.header}
                                            level={2}>
                                            Dialog
                                        </Header>
                                        <div className={styles.body}>
                                            <P>Dialog contents here</P>
                                        </div>
                                    </Dialog>
                                </P>
                            </div>
                        </ContentSection>
                    );
                })}
            </ContentSections>
        </Fragment>
    );
};

export default Page;
