import React, { Fragment, FunctionComponent, useContext } from 'react';
import classNames from 'classnames';
import SiteHead from '../common/site-head';
import PlatformContext from '../../context/platform-context';

import demoStyles from './demo-common.module.scss';
import styles from './demo-platform.module.scss';

const Page: FunctionComponent = () => {
    const platform = useContext(PlatformContext);

    function toTitleCase(str: string): string {
        if (str.length === 0) {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    }

    return (
        <Fragment>
            <SiteHead title={'Demo - Platform'} noTitlePrefix={true} />
            <div className={classNames(demoStyles.container, styles.body)}>
                <h1 className={styles.title}>Platform</h1>
                {toTitleCase(platform.type)} Platform (
                {toTitleCase(platform.mode)} Mode)
            </div>
        </Fragment>
    );
};

export default Page;
