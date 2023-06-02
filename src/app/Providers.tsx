'use client';
import {SessionProvider} from "next-auth/react"
import {CacheProvider} from '@emotion/react';
import {useEmotionCache, MantineProvider, ColorSchemeProvider, ColorScheme} from '@mantine/core';
import {useServerInsertedHTML} from 'next/navigation';
import {ReactNode, useState} from "react";

export const Providers = ({children}: { children: ReactNode }) => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    const cache = useEmotionCache();
    cache.compat = true;

    useServerInsertedHTML(() => (
        <style
            data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
            dangerouslySetInnerHTML={{
                __html: Object.values(cache.inserted).join(' '),
            }}
        />
    ));

    return (
        <SessionProvider>
            <CacheProvider value={cache}>
                <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                    <MantineProvider withGlobalStyles withNormalizeCSS theme={{
                        colorScheme: 'dark',
                    }}>
                        {children}
                    </MantineProvider>
                </ColorSchemeProvider>
            </CacheProvider>
        </SessionProvider>
    )
}
