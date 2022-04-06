import React, {
    Fragment,
    FunctionComponent,
    useContext,
    useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
    SITE_DOMAIN,
    SITE_HEADER_COPYRIGHT,
    PAGE_TITLE_SUFFIX,
    SITE_HEADER_TWITTER,
    SITE_HEADER_DOMAIN,
    DEFAULT_PAGE_TITLE,
    GOOGLE_ANALYTICS_TAG_ID,
    DEFAULT_FAVICONS,
} from '../../constants/site-constants';
import PlatformContext from '../../context/platform-context';
import { toStaticResourceUrl } from '../../utils/url-utils';

export type Favicons = {
    href: string;
    type?: string;
    sizes?: string;
}[];

export type SiteHeadProps = {
    title?: string;
    description?: string;
    keywords?: string[];
    url?: string;
    favicons?: Favicons | undefined;
    image?: {
        src: string; // leave as empty string to indicate no image
        type?: string;
        width?: number;
        height?: number;
    };
    twitterImageSrc?: string; // leave as empty string to indicate no image
    viewport?: string;
    noTitlePrefix?: boolean;
};

const SiteHead: FunctionComponent<SiteHeadProps> = (props) => {
    const platform = useContext(PlatformContext);

    if (platform.type === 'local') {
        return <SiteHeadLocal {...props} />;
    } else if (platform.type === 'website') {
        return <SiteHeadWebsite {...props} />;
    }
    return null;
};

const SiteHeadLocal: FunctionComponent<SiteHeadProps> = (props) => {
    const platform = useContext(PlatformContext);
    const {
        title: inputTitle,
        noTitlePrefix: inputNoTitlePrefix,
        favicons: inputFavicons,
    } = props;
    const noTitlePrefix =
        typeof inputNoTitlePrefix !== 'undefined' && inputNoTitlePrefix;
    const title =
        (inputTitle || DEFAULT_PAGE_TITLE) +
        (noTitlePrefix ? '' : PAGE_TITLE_SUFFIX);
    const favicons = inputFavicons || DEFAULT_FAVICONS;

    useEffect(() => {
        document.title = title;
    }, [title]);

    return ReactDOM.createPortal(
        <Fragment>
            {favicons &&
                favicons.map((favicon, i) => {
                    const { href, ...otherProps } = favicon;
                    return <link key={i} rel="icon" href={toStaticResourceUrl(href, platform)} {...otherProps} />;
                })}
        </Fragment>,
        document.head,
    );
};

const SiteHeadWebsite: FunctionComponent<SiteHeadProps> = (props) => {
    const router = useRouter();
    const {
        title: inputTitle,
        noTitlePrefix: inputNoTitlePrefix,
        description,
        keywords,
        url: inputUrl,
        favicons: inputFavicons,
        image: inputImage,
        twitterImageSrc: inputTwitterImageSrc,
        viewport: inputViewport,
    } = props;
    const noTitlePrefix =
        typeof inputNoTitlePrefix !== 'undefined' && inputNoTitlePrefix;
    const title =
        (inputTitle || DEFAULT_PAGE_TITLE) +
        (noTitlePrefix ? '' : PAGE_TITLE_SUFFIX);
    const url =
        typeof inputUrl == 'undefined' ? SITE_DOMAIN + router.asPath : inputUrl;
    const favicons = inputFavicons || DEFAULT_FAVICONS;
    const image = inputImage || {
        src: `${SITE_DOMAIN}/images/site-preview.jpg`,
        type: 'image/jpeg',
        width: 1200,
        height: 630,
    };
    const twitterImageSrc =
        typeof inputTwitterImageSrc == 'undefined'
            ? `${SITE_DOMAIN}/images/site-preview-twitter.jpg`
            : inputTwitterImageSrc;
    const viewport = inputViewport || 'width=device-width, initial-scale=1';
    return (
        <Head>
            {GOOGLE_ANALYTICS_TAG_ID && (
                <Fragment>
                    {/* Google analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_TAG_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());

                                gtag('config', '${GOOGLE_ANALYTICS_TAG_ID}');
                            `,
                        }}
                    />
                </Fragment>
            )}

            <title>{title}</title>
            <meta charSet="utf-8" />
            {favicons &&
                favicons.map((favicon, i) => (
                    <link key={i} rel="icon" {...favicon} />
                ))}
            <meta name="viewport" content={viewport} />

            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords.join(', ')} />}
            <meta name="language" content="english" />
            <meta name="copyright" content={SITE_HEADER_COPYRIGHT} />
            <meta name="distribution" content="global" />

            {/* Open Graph / Facebook */}
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            {url && <meta property="og:url" content={url} />}
            {description && (
                <meta property="og:description" content={description} />
            )}
            {image && image.src && (
                <Fragment>
                    <meta property="og:image" content={image.src} />
                    <meta property="og:image:type" content="image/jpeg" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                </Fragment>
            )}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:site" content={SITE_HEADER_TWITTER} />
            <meta property="twitter:title" content={title} />
            {description && (
                <meta property="twitter:description" content={description} />
            )}
            {twitterImageSrc && (
                <meta property="twitter:image" content={twitterImageSrc} />
            )}
            {url && <meta property="twitter:url" content={url} />}
            <meta property="twitter:domain" content={SITE_HEADER_DOMAIN} />
        </Head>
    );
};

export default SiteHead;
