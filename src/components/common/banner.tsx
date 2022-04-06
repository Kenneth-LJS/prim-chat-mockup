import React, { FunctionComponent, useContext } from 'react';
import PlatformContext from '../../context/platform-context';
import { normalizeUrl } from '../../utils/url-utils';

import styles from './banner.module.scss';

type BannerProps = {
    bgSrc: string;
    topPadding?: number | string | undefined;
};

const Banner: FunctionComponent<BannerProps> = (props) => {
    const platform = useContext(PlatformContext);
    const { bgSrc, topPadding: inputTopPadding, children } = props;
    const topPadding = typeof inputTopPadding === 'undefined' ? 0 : inputTopPadding;
    return (
        <div className={styles.banner}>
            <div className={styles.bannerBackground} style={{ backgroundImage: `url(${normalizeUrl(bgSrc, platform)})` }} />
            <div className={styles.bannerContent} style={{ top: topPadding }}>
                {children}
            </div>
        </div>
    );
};

export default Banner;
