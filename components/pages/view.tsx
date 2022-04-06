import React, { Fragment, FunctionComponent, useContext } from 'react';
import PlatformContext from '../../context/platform-context';
import { Theme } from '../../context/theme-context';
import ContentSection from '../common/content-section';
import MainLayout from '../layouts/main-layout';
import SiteHead from '../common/site-head';
import Header from '../common/header';
import P from '../common/paragraph';

import styles from './view.module.scss';

const IndexPage: FunctionComponent = () => {
    return (
        <Fragment>
            <SiteHead title={'View Prototype'} />
            
        </Fragment>
    );
};

export default IndexPage;
