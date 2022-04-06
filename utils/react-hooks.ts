import { useState, useEffect, Dispatch, SetStateAction, MutableRefObject, useContext } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import PlatformContext from '../context/platform-context';

export type MousePosition =
    | {
          clientX?: number;
          clientY?: number;
          pageX?: number;
          pageY?: number;
          screenX?: number;
          screenY?: number;
      }
    | undefined;

export function useMousePosition(): MousePosition {
    const [mousePosition, setMousePosition] = useState(undefined as MousePosition);

    useEffect(() => {
        function handleMouseMove(event: MouseEvent) {
            setMousePosition({
                clientX: event.clientX,
                clientY: event.clientY,
                pageX: event.pageX,
                pageY: event.pageY,
                screenX: event.screenX,
                screenY: event.screenY,
            });
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return mousePosition;
}

export type WindowScroll = {
    scrollX?: number;
    scrollY?: number;
    scrollWidth?: number;
    scrollHeight?: number;
};

export function useWindowScroll(): WindowScroll {
    const [windowScroll, setWindowScroll] = useState({
        scrollX: undefined,
        scrollY: undefined,
        scrollWidth: undefined,
        scrollHeight: undefined,
    });

    useEffect(() => {
        function handleScroll() {
            setWindowScroll({
                scrollX: window.scrollX,
                scrollY: window.scrollY,
                scrollWidth: window.document.body.scrollWidth,
                scrollHeight: window.document.body.scrollHeight,
            });
        }
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return windowScroll;
}

export type WindowSize = {
    width?: number;
    height?: number;
};

export function useWindowSize(): WindowSize {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}

export function useWindowWidth(): number | undefined {
    const [windowWidth, setWindowWidth] = useState(undefined as number | undefined);
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            if (window.innerWidth === windowWidth) {
                return;
            }
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowWidth;
}

export function useWindowHeight(): number | undefined {
    const [windowHeight, setWindowHeight] = useState(undefined as number | undefined);
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            if (window.innerHeight === windowHeight) {
                return;
            }
            setWindowHeight(window.innerHeight);
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowHeight;
}

interface Viewport {
    width: number;
    height: number;
    offsetLeft: number;
    offsetTop: number;
    pageLeft: number;
    pageTop: number;
    scale: number;
}

export function useViewport(): Viewport {
    if (typeof window === 'undefined') {
        return undefined;
    }

    const windowAny = window as any;
    if (!windowAny.visualViewport) {
        return undefined;
    }

    const [viewport, setViewport] = useState({
        width: undefined,
        height: undefined,
        offsetLeft: undefined,
        offsetTop: undefined,
        pageLeft: undefined,
        pageTop: undefined,
        scale: undefined,
    } as Viewport);

    useEffect(() => {
        let pendingUpdate = false;

        function handleViewportChange(event: { target: Viewport }) {
            if (pendingUpdate) {
                return;
            }
            pendingUpdate = true;

            requestAnimationFrame(() => {
                pendingUpdate = false;

                const newViewportSize = event.target;
                setViewport({
                    width: newViewportSize.width,
                    height: newViewportSize.height,
                    offsetLeft: newViewportSize.offsetLeft,
                    offsetTop: newViewportSize.offsetTop,
                    pageLeft: newViewportSize.pageLeft,
                    pageTop: newViewportSize.pageTop,
                    scale: newViewportSize.scale,
                });
            });
        }

        windowAny.visualViewport.addEventListener('scroll', handleViewportChange);
        windowAny.visualViewport.addEventListener('resize', handleViewportChange);

        handleViewportChange({ target: windowAny.visualViewport });

        // Remove event listener on cleanup
        return () => {
            windowAny.visualViewport.removeEventListener('resize', handleViewportChange);
            windowAny.visualViewport.removeEventListener('scroll', handleViewportChange);
        };
    }, []); // Empty array ensures that effect is only run on mount

    return viewport;
}

export function useBoundingClientRect(ref: MutableRefObject<HTMLElement>): DOMRectReadOnly | undefined {
    const [boundingClientRect, setBoundingClientRect] = useState(undefined as (DOMRectReadOnly | undefined));

    useEffect(() => {
        if (typeof ref.current == 'undefined' || ref.current === null) {
            return;
        }

        function handleShift() {
            if (typeof ref.current == 'undefined' || ref.current === null) {
                return;
            }
            const newRect = DOMRectReadOnly.fromRect(ref.current.getBoundingClientRect());
            if (
                boundingClientRect != undefined &&
                newRect.bottom == boundingClientRect.bottom &&
                newRect.height == boundingClientRect.height &&
                newRect.left == boundingClientRect.left &&
                newRect.right == boundingClientRect.right &&
                newRect.top == boundingClientRect.top &&
                newRect.width == boundingClientRect.width &&
                newRect.x == boundingClientRect.x &&
                newRect.y == boundingClientRect.y
            ) {
                return;
            }
            setBoundingClientRect(newRect);
        }

        window.addEventListener('resize', handleShift);
        window.addEventListener('scroll', handleShift);
        const resizeObserver = new ResizeObserver(handleShift);
        resizeObserver.observe(ref.current);

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
            window.removeEventListener('scroll', handleShift);
            window.removeEventListener('resize', handleShift);
        };
    }, [ref.current]);

    return boundingClientRect;
}

type DOMRectXReadOnly = Pick<DOMRectReadOnly, 'left' | 'right' | 'width' | 'x'>;

export function useBoundingClientRectX(ref: MutableRefObject<HTMLElement>): DOMRectXReadOnly | undefined {
    const [boundingClientRect, setBoundingClientRect] = useState(undefined as (DOMRectXReadOnly | undefined));

    useEffect(() => {
        if (typeof ref.current == 'undefined' || ref.current === null) {
            return;
        }

        function handleShift() {
            if (typeof ref.current == 'undefined' || ref.current === null) {
                return;
            }
            const newRect = DOMRectReadOnly.fromRect(ref.current.getBoundingClientRect());
            if (
                boundingClientRect != undefined &&
                newRect.left === boundingClientRect.left &&
                newRect.right === boundingClientRect.right &&
                newRect.width === boundingClientRect.width &&
                newRect.x === boundingClientRect.x
            ) {
                return;
            }
            setBoundingClientRect(newRect as DOMRectXReadOnly);
        }

        window.addEventListener('resize', handleShift);
        window.addEventListener('scroll', handleShift);
        const resizeObserver = new ResizeObserver(handleShift);
        resizeObserver.observe(ref.current);

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
            window.removeEventListener('scroll', handleShift);
            window.removeEventListener('resize', handleShift);
        };
    });

    return boundingClientRect;
}

type DOMRectYReadOnly = Pick<DOMRectReadOnly, 'bottom' | 'height' | 'top' | 'y'>;

export function useBoundingClientRectY(ref: MutableRefObject<HTMLElement>): DOMRectYReadOnly | undefined {
    const [boundingClientRect, setBoundingClientRect] = useState(undefined as (DOMRectYReadOnly | undefined));

    useEffect(() => {
        if (typeof ref.current == 'undefined' || ref.current === null) {
            return;
        }

        function handleShift() {
            if (typeof ref.current == 'undefined' || ref.current === null) {
                return;
            }
            const newRect = DOMRectReadOnly.fromRect(ref.current.getBoundingClientRect());
            if (
                boundingClientRect != undefined &&
                newRect.bottom == boundingClientRect.bottom &&
                newRect.height == boundingClientRect.height &&
                newRect.top == boundingClientRect.top &&
                newRect.y == boundingClientRect.y
            ) {
                return;
            }
            setBoundingClientRect(newRect as DOMRectYReadOnly);
        }

        window.addEventListener('resize', handleShift);
        window.addEventListener('scroll', handleShift);
        const resizeObserver = new ResizeObserver(handleShift);
        resizeObserver.observe(ref.current);

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
            window.removeEventListener('scroll', handleShift);
            window.removeEventListener('resize', handleShift);
        };
    });

    return boundingClientRect;
}

export type Size = {
    width: number;
    height: number;
};

export function useSize(ref: MutableRefObject<HTMLElement>): Size | undefined {
    const [size, setSize] = useState(undefined);

    useEffect(() => {
        if (typeof ref.current == 'undefined' || ref.current === null) {
            return;
        }

        function handleResize() {
            if (typeof ref.current == 'undefined' || ref.current === null) {
                return;
            }
            const newRect = DOMRectReadOnly.fromRect(ref.current.getBoundingClientRect());
            if (size != undefined && newRect.width == size.width && newRect.height == size.height) {
                return;
            }

            setSize({ width: newRect.width, height: newRect.height });
        }

        window.addEventListener('resize', handleResize);
        // @ts-ignore
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(ref.current);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    });

    return size;
}

export function useWidth(ref: MutableRefObject<HTMLElement>): number | undefined {
    const [width, setWidth] = useState(undefined);

    useEffect(() => {
        if (typeof ref.current == 'undefined' || ref.current === null) {
            return;
        }

        function handleResize() {
            if (typeof ref.current == 'undefined' || ref.current === null) {
                return;
            }
            const newRect = DOMRectReadOnly.fromRect(ref.current.getBoundingClientRect());
            if (width === newRect.width) {
                return;
            }
            setWidth(newRect.width);
        }

        window.addEventListener('resize', handleResize);
        // @ts-ignore
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(ref.current);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    });

    return width;
}

export function useHeight(ref: MutableRefObject<HTMLElement>): number | undefined {
    const [height, setHeight] = useState(undefined);

    useEffect(() => {
        if (typeof ref.current == 'undefined' || ref.current === null) {
            return;
        }

        function handleResize() {
            if (typeof ref.current == 'undefined' || ref.current === null) {
                return;
            }
            const newRect = DOMRectReadOnly.fromRect(ref.current.getBoundingClientRect());
            if (height === newRect.height) {
                return;
            }
            setHeight(newRect.height);
        }

        window.addEventListener('resize', handleResize);
        // @ts-ignore
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(ref.current);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    });

    return height;
}

export type WindowLocation = {
    href?: string;
    origin?: string;
    protocol?: string;
    host?: string;
    hostname?: string;
    port?: string;
    pathname?: string;
    search?: string;
    hash?: string;
};

export function useWindowLocation(): WindowLocation {
    const [windowLocation, setWindowLocation] = useState({
        href: undefined,
        origin: undefined,
        protocol: undefined,
        host: undefined,
        hostname: undefined,
        port: undefined,
        pathname: undefined,
        search: undefined,
        hash: undefined,
    });

    useEffect(() => {
        function handleLocationChange() {
            setWindowLocation({
                href: window.location.href,
                origin: window.location.origin,
                protocol: window.location.protocol,
                host: window.location.host,
                hostname: window.location.hostname,
                port: window.location.port,
                pathname: window.location.pathname,
                search: window.location.search,
                hash: window.location.hash,
            });
        }
        window.addEventListener('popstate', handleLocationChange);
        handleLocationChange();
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    return windowLocation;
}

export function useLocationPath(): string {
    const platform = useContext(PlatformContext);
    const windowLocation = useWindowLocation();

    if (typeof windowLocation.pathname === 'undefined') {
        return undefined;
    }

    if (platform.type === 'local') {
        const baseHref = document.querySelector('base').href;
        const curHref = windowLocation.href || '';
        let path = curHref.substring(baseHref.length);
        if (path.toLowerCase().endsWith('.html')) {
            path = path.substring(0, path.length - 5);
        }
        if (path.toLocaleLowerCase().endsWith('index')) {
            path = path.substring(0, path.length - 5);
        }
        if (path.endsWith('/')) {
            path = path.substring(0, path.length - 1);
        }
        return '/' + path;
    } else if (platform.type === 'website') {
        return windowLocation.pathname;
    }

    return undefined;
}

export type LocalStorage =
    | {
          [key: string]: string;
      }
    | undefined;

export function useLocalStorage(): [LocalStorage, Dispatch<SetStateAction<LocalStorage>>] {
    const [localStorage, setLocalStorage] = useState(undefined as LocalStorage);

    useEffect(() => {
        function handleStorage() {
            // Make shallow copy
            setLocalStorage(Object.assign({}, window.localStorage));
        }
        window.addEventListener('storage', handleStorage);
        handleStorage(); // Initialize storage
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    function updateLocalStorage(storage: LocalStorage) {
        if (typeof window === 'undefined') {
            // We're not running in the browser
            return;
        }
        Object.keys(storage).forEach((key) => {
            window.localStorage.setItem(key, storage[key]);
        });
        const storageUpdate = Object.assign({}, localStorage, storage);
        setLocalStorage(storageUpdate);
    }

    return [localStorage, updateLocalStorage];
}
