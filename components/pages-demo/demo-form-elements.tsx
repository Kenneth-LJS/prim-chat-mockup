import React, { Fragment, FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import demoStyles from './demo-common.module.scss';
import SiteHead from '../common/site-head';
import Button from '../common/button';
import TextArea from '../common/textarea';
import Input from '../common/input';

import styles from './demo-form-elements.module.scss';
import Select from '../common/select';
import Header from '../common/header';
import P from '../common/paragraph';
import Dialog from '../common/dialog';

const selectOptions = [
    { value: 'input', label: 'Input' },
    { value: 'option-1', label: 'Option 1' },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3' },
    { value: 'really-long-option', label: 'Really Long Option' },
];

const Page: FunctionComponent = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <Fragment>
            <SiteHead title={'Demo - Form Elements'} noTitlePrefix={true} />
            <div className={classNames(demoStyles.container, styles.body)}>
                <h1 className={styles.title}>Form Elements</h1>
                <div>
                    <h2 className={styles.header1}>Buttons</h2>
                    <div className={styles.elemGroup}>
                        <Button>Enabled</Button>
                        <Button disabled>Disabled</Button>
                    </div>
                </div>
                <div className={styles.elemSection}>
                    <h2 className={styles.header1}>Input</h2>
                    <div className={styles.elemGroup}>
                        <Input defaultValue={'Enabled'} />
                        <Input defaultValue={'Disabled'} disabled />
                    </div>
                </div>
                <div className={styles.elemSection}>
                    <h2 className={styles.header1}>Text Area</h2>
                    <div className={styles.elemGroup}>
                        <TextArea defaultValue={'Enabled'} />
                        <TextArea defaultValue={'Disabled'} disabled />
                    </div>
                </div>
                <div className={styles.elemSection}>
                    <h2 className={styles.header1}>Select</h2>
                    <div
                        className={classNames(
                            styles.elemGroup,
                            styles.forcedSize,
                        )}>
                        <div className={styles.selectElemSize}>
                            <Select options={selectOptions} />
                        </div>
                        <div className={styles.selectElemSize}>
                            <Select options={selectOptions} disabled />
                        </div>
                    </div>
                </div>
                <div className={styles.elemSection}>
                    <h2 className={styles.header1}>Dialog</h2>
                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        disabled={isDialogOpen}>
                        Click here to open the dialog
                    </Button>
                    <Dialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        onExternalClick={() => setIsDialogOpen(false)}>
                        <Header className={styles.header1} level={2}>
                            Dialog
                        </Header>
                        <div className={styles.body}>
                            <P>Dialog contents here</P>
                        </div>
                    </Dialog>
                </div>
                <div className={styles.elemSection}>
                    <h2 className={styles.header1}>All</h2>
                    <div className={styles.elemGroup}>
                        <Button>Button</Button>
                        <Input defaultValue={'Input'} />
                        <div className={styles.selectElemSize}>
                            <Select options={selectOptions} />
                        </div>
                        <TextArea defaultValue={'Text Area'} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Page;
