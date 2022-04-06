import React, { AnchorHTMLAttributes, FunctionComponent, useContext } from 'react';
import NextLink from 'next/link';
import PlatformContext from '../../context/platform-context';
import classNames from 'classnames';

import styles from './link.module.scss';
import { isExternalLink, normalizePageUrl } from '../../utils/url-utils';

export type LinkPropsPartial = {
    href: string;
    className?: string;
    download?: string;
    newTab?: boolean;
};

export function extractLinkPropsPartial(obj: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { href, className, download, newTab, ...rest } = obj;
    return rest;
}

export type LinkProps = LinkPropsPartial & Partial<AnchorHTMLAttributes<HTMLAnchorElement>>;

const Link: FunctionComponent<LinkProps> = (props) => {
    const platform = useContext(PlatformContext);

    const { href, className, newTab, children, ...anchorProps } = props;
    const externalLink = isExternalLink(href) || newTab;

    if (platform.type === 'website' && !externalLink) {
        return (
            <NextLink href={normalizePageUrl(href, platform)}>
                <a className={classNames(styles.link, className)} {...anchorProps}>
                    {children}
                </a>
            </NextLink>
        );
    }

    const normalizedHref = externalLink ? href : normalizePageUrl(href, platform);
    return (
        <a className={classNames(styles.link, className)} href={normalizedHref} {...anchorProps}>
            {children}
        </a>
    );
};

export default Link;
