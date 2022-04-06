import React, { FunctionComponent } from 'react';
import '../styles/global/_index.scss';

type AppProps = {
    Component: any;
    pageProps: any;
    router: any;
};

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
    return (
        <Component {...pageProps} />
    );
};

export default App;
