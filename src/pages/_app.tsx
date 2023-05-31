import {AppProps} from 'next/app';
import {SessionProvider} from "next-auth/react"
import Head from 'next/head';
import {rtlCache} from '../rtl-cache';
import {MantineProvider} from '@mantine/core';

export default function App(props: AppProps) {
    const {Component, pageProps} = props;

    return (
        <>
            <Head>
                <title>Page title</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <SessionProvider session={pageProps.session}>
                <div dir="rtl">
                    <MantineProvider
                        theme={{ dir: 'rtl' }}
                        withGlobalStyles
                        withNormalizeCSS
                        emotionCache={rtlCache}
                    >
                        <Component {...pageProps} />
                    </MantineProvider>
                </div>
            </SessionProvider>
        </>
    );
}
