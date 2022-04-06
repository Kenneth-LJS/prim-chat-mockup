import { ReactNode } from 'react';
import { Platform } from '../context/platform-context';

export const NAV_BRAND_HREF = '' as string | undefined;

export type PlatformFilter = Partial<Platform>;
export type PlatformFilters = PlatformFilter[];
/*
    PlatformFilters is an array of PlatformFilter.
    
    If any of the PlatformFilter in the array matches the NavLink/NavSubLink,
    the link will be shown. Otherwise, the link is hidden in the nav bar.

    PlatformFilter matching:
    {} matches all platforms
    { type: 'website' } only matches website type platforms
    { mode: 'development' } only matches development mode platforms
    { type: 'website', mode: 'development' } only matches website type in development mode
    [{ type: 'website' }, { mode: 'development' }] matches platforms that are of the website type AND/OR in development mode
*/

export type NavLink = {
    href?: string;
    content: ReactNode;
    subLinks?: NavSubLinks;
    platforms?: PlatformFilters;
};
export type NavLinks = NavLink[];
export type NavSubLink = {
    href: string;
    content: ReactNode;
    platforms?: PlatformFilters;
};
export type NavSubLinks = NavSubLink[];

export const NAV_LINKS = [
    {
        content: 'Page 1',
        href: '/page-1',
        subLinks: [
            {
                content: 'Links',
                href: '/page-1',
            },
            {
                content: 'that',
                href: '/page-2',
            },
            {
                content: 'don’t',
                href: '/page-3',
            },
            {
                content: 'lead',
                href: '/page-4',
            },
            {
                content: 'anywhere',
                href: '#',
            },
        ],
    },
    {
        content: 'Page 2',
        href: '/page-2',
    },
    {
        content: 'Page 3',
        href: '/page-3',
    },
    {
        content: 'Page 4',
        href: '/page-4',
    },
    {
        content: 'Demo',
        platforms: [{ mode: 'development' }], // Only show this in development mode
        subLinks: [
            {
                content: 'Platform',
                href: '/demo/platform',
            },
            {
                content: 'Typography',
                href: '/demo/typography',
            },
            {
                content: 'Color',
                href: '/demo/color',
            },
            {
                content: 'Content Section',
                href: '/demo/content-section',
            },
            {
                content: 'Form Elements',
                href: '/demo/form-elements',
            },
            {
                content: 'Theme',
                href: '/demo/theme',
            },
        ],
    },
] as NavLinks;

export function getNavLinks(platform: Platform): NavLinks {
    return filterPlatformNavLinks(NAV_LINKS, platform);
}

function filterPlatformNavLinks(
    navLinks: NavLinks,
    platform: Platform,
): NavLinks {
    return navLinks
        .filter((navLink) => filterPlatform(platform, navLink.platforms))
        .map((navLink) => {
            if (typeof navLink.subLinks === 'undefined') {
                return navLink;
            }
            return {
                ...navLink,
                subLinks: filterPlatformNavSubLinks(navLink.subLinks, platform),
            };
        });
}

function filterPlatformNavSubLinks(
    navSubLinks: NavSubLinks,
    platform: Platform,
): NavSubLinks {
    return navSubLinks.filter((navSubLink) =>
        filterPlatform(platform, navSubLink.platforms),
    );
}

function filterPlatform(platform: Platform, filters?: PlatformFilter[]) {
    if (typeof filters === 'undefined') {
        return true;
    }
    for (const filter of filters) {
        let isMatch = true;
        if (
            typeof filter.mode !== 'undefined' &&
            filter.mode !== platform.mode
        ) {
            isMatch = false;
        }
        if (
            typeof filter.type !== 'undefined' &&
            filter.type !== platform.type
        ) {
            isMatch = false;
        }
        if (isMatch) {
            return true;
        }
    }
    return false;
}