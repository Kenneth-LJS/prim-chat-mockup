import { Platform } from '../context/platform-context';

const TEST_BASE_URL = 'http://test-domain';

export function normalizeUrl(url: string, platform: Platform) {
    if (isExternalLink(url)) {
        return url;
    }
    url = url.replace(/^\/+/, ''); // remove starting slashes
    return platform.type === 'local' ? url : ('/' + url);
}

export function normalizePageUrl(url: string, platform: Platform) {
    if (isExternalLink(url)) {
        return url;
    }
    url = url.replace(/^\/+/, ''); // remove starting slashes
    if (platform.type === 'local' && url === '') {
        return 'index.html';
    }
    return platform.type === 'local' ? (url + '.html') : ('/' + url);
}

export function isExternalLink(url: string) {
    if (url.startsWith('.')) {
        throw Error('Unable to handle relative URLs');
    }
    const urlObj = new URL(url, TEST_BASE_URL);
    return urlObj.origin !== TEST_BASE_URL;
}

export function toStaticResourceUrl(url: string, platform: Platform) {
    // use this on static resource urls, e.g. "/images/favicon.png"

    if (platform.type === 'local' && url.startsWith('/')) {
        return '.' + url;
    }

    return url;
}