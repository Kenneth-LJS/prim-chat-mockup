import React, { FunctionComponent, HTMLAttributes } from 'react';
import Link, { LinkProps, LinkPropsPartial, extractLinkPropsPartial } from './link';

type OptionalLinkPropsWithHref = LinkProps;
type OptionalLinkPropsWithoutHref = Omit<LinkPropsPartial, 'href'> & { href: undefined } & Partial<HTMLAttributes<HTMLSpanElement>>;
type OptionalLinkProps = OptionalLinkPropsWithHref | OptionalLinkPropsWithoutHref;

const OptionalLink: FunctionComponent<OptionalLinkProps> = (props) => {
    const { href, className, children } = props;

    if (typeof href === 'undefined') {
        const spanProps = extractLinkPropsPartial(props);
        return <span className={className} {...spanProps}>{children}</span>;
    }
    return <Link {...props}>{children}</Link>;
};

export default OptionalLink;
