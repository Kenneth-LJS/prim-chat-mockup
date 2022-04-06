import React, {
    FunctionComponent,
    Fragment,
    ReactNode,
    Ref,
    forwardRef,
    useRef,
    CSSProperties,
    useEffect,
    useState,
} from 'react';
import {
    NavLinks as NavLinksT,
    NavSubLink as NavSubLinkT,
} from '../../constants/nav-constants';
import {
    useBoundingClientRectX,
    useLocationPath,
    useWindowWidth,
} from '../../utils/react-hooks';
import OptionalLink from './optional-link';
import classNames from 'classnames';

import styles from './nav.module.scss';

type NavProps = {
    brandHref?: string | undefined;
    links: NavLinksT;
    zIndex?: number | undefined;

    placeholderRef?: Ref<HTMLDivElement>;
};

const Nav = forwardRef<HTMLDivElement, NavProps>((props, ref) => {
    const { brandHref, links, zIndex, placeholderRef } = props;

    const curPath = useLocationPath();

    const windowWidth = useWindowWidth() || 0;
    const navDesktopWidthThresholdPx = parseInt(
        styles.navDesktopWidthThresholdPx,
    );
    const isDesktop = windowWidth > navDesktopWidthThresholdPx;

    return (
        <Fragment>
            <div className={styles.navPlaceholder} ref={placeholderRef} />
            <div
                className={styles.navContainer}
                style={{ zIndex: zIndex }}
                ref={ref}>
                <nav className={styles.nav}>
                    <NavBrand href={brandHref} />
                    <NavMobileToggle />
                    <NavLinks
                        links={links}
                        curPath={curPath}
                        isDesktop={isDesktop}
                    />
                </nav>
            </div>
        </Fragment>
    );
});

type NavBrandProps = {
    href?: string | undefined;
};

const NavBrand: FunctionComponent<NavBrandProps> = (props) => {
    const { href } = props;

    // Brand Image
    // return (
    //     <div className={styles.navBrandContainer}>
    //         <OptionalLink href={href} tabIndex={0}>
    //             <Image
    //                 src="/images/logo-rectangle-white.png"
    //                 className={styles.navBrandImg}
    //             />
    //         </OptionalLink>
    //     </div>
    // );

    // Brand Text
    return (
        <div className={styles.navBrandContainer}>
            <OptionalLink
                className={styles.navBrandLink}
                href={href}
                tabIndex={0}>
                <span className={styles.navBrandText}>BRAND NAME</span>
            </OptionalLink>
        </div>
    );
};

type NavLinksProps = {
    links: NavLinksT;
    curPath?: string | undefined;
    isDesktop: boolean;
};

const NavLinks: FunctionComponent<NavLinksProps> = (props) => {
    const { links, curPath, isDesktop } = props;
    const ref = useRef(undefined);

    function handleLinkMouseEnter(
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) {
        if (!ref.current) {
            return;
        }
        Array.from(ref.current.children).forEach((linkElem: HTMLDivElement) => {
            if (event.currentTarget === linkElem) {
                return;
            }
            linkElem.blur();
        });
    }

    return (
        <div className={styles.navLinks}>
            {links.map((link, index) => (
                <NavLink
                    key={index}
                    {...link}
                    curPath={curPath}
                    isDesktop={isDesktop}
                    onLinkMouseEnter={handleLinkMouseEnter}
                />
            ))}
        </div>
    );
};

type NavLinkProps = {
    href?: string | undefined;
    content: ReactNode;
    subLinks?: NavSubLinkT[] | undefined;
    curPath?: string | undefined;
    isDesktop: boolean;
    onLinkMouseEnter: (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => void;
};

const NavLink: FunctionComponent<NavLinkProps> = (props) => {
    const { href, content, subLinks, curPath, isDesktop, onLinkMouseEnter } =
        props;
    const isActive = typeof href !== 'undefined' && curPath === href;
    const className = classNames(styles.navLink, isActive && styles.active);
    return (
        <div
            className={styles.navLinkContainer}
            tabIndex={typeof href === 'undefined' ? 0 : undefined}
            onMouseEnter={onLinkMouseEnter}>
            <OptionalLink
                href={isActive ? undefined : href}
                className={className}
                tabIndex={typeof href === 'undefined' ? undefined : 0}>
                {content}
            </OptionalLink>
            {subLinks && (
                <NavSubLinks
                    subLinks={subLinks}
                    curPath={curPath}
                    isDesktop={isDesktop}
                />
            )}
        </div>
    );
};

type NavSubLinksProps = {
    subLinks: NavSubLinkT[];
    curPath?: string | undefined;
    isDesktop: boolean;
};

const NavSubLinks: FunctionComponent<NavSubLinksProps> = (props) => {
    const { subLinks, curPath, isDesktop } = props;

    const containerStyle = {} as CSSProperties;

    const [clientWidth, setClientWidth] = useState(0);
    useEffect(() => {
        setClientWidth(document.documentElement.clientWidth);
    }, [useWindowWidth()]);
    const positioningRef = useRef(undefined);
    const positioningPos = useBoundingClientRectX(positioningRef);

    if (isDesktop && typeof positioningPos !== 'undefined') {
        const pageXPadding = parseInt(styles.pageXPaddingPx);
        if (positioningPos.left < pageXPadding) {
            containerStyle.transform = `translateX(${
                pageXPadding - positioningPos.left
            }px)`;
        } else if (positioningPos.right > clientWidth - pageXPadding) {
            containerStyle.transform = `translateX(${
                clientWidth - pageXPadding - positioningPos.right
            }px)`;
        }
    }

    return (
        <div className={styles.navSubLinksPositioning} ref={positioningRef}>
            <div className={styles.navSubLinksContainer} style={containerStyle}>
                <div className={styles.navSubLinks}>
                    {subLinks.map((subLink, index) => (
                        <NavSubLink
                            key={index}
                            href={subLink.href}
                            content={subLink.content}
                            curPath={curPath}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

type NavSubLinkProps = {
    href: string;
    content: ReactNode;
    curPath?: string | undefined;
};

const NavSubLink: FunctionComponent<NavSubLinkProps> = (props) => {
    const { href, content, curPath } = props;
    const isActive = typeof href !== 'undefined' && curPath === href;
    const className = classNames(styles.navSubLink, isActive && styles.active);
    return (
        <OptionalLink
            href={isActive ? undefined : href}
            className={className}
            tabIndex={isActive ? undefined : 0}>
            {content}
        </OptionalLink>
    );
};

const NavMobileToggle: FunctionComponent = () => {
    return (
        <Fragment>
            <div className={styles.navMobileToggle} tabIndex={0}>
                <div className={styles.navMobileToggleBar1} />
                <div className={styles.navMobileToggleBar2} />
                <div className={styles.navMobileToggleBar3} />
            </div>
            <div className={styles.navMobileToggleActiveBlock} />
        </Fragment>
    );
};

export default Nav;
