'use client';
import { SessionProvider } from "next-auth/react"
import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import { ReactNode} from "react";

export const Providers = ({children}: {children: ReactNode}) => {
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
        <SessionProvider >
            <CacheProvider value={cache}>
                <MantineProvider withGlobalStyles withNormalizeCSS>
                    {children}
                </MantineProvider>
            </CacheProvider>
        </SessionProvider>
    )
}
