import React, { FunctionComponent } from 'react';
import CommonPage from '../../components/pages-demo/demo-color';
import { PlatformProvider, PlatformMode } from '../../context/platform-context';

const PLATFORM_MODE = process.env.NEXT_PUBLIC_NODE_ENV as PlatformMode;

const Page: FunctionComponent = () => {
    return (
        <PlatformProvider value={{ type: 'website', mode: PLATFORM_MODE }}>
            <CommonPage />
        </PlatformProvider>
    );
};

export default Page;
