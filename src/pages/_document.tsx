import { createGetInitialProps } from '@mantine/next';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';
import { rtlCache } from '../rtl-cache';

const stylesServer = createStylesServer(rtlCache);


const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: [
                initialProps.styles,
                <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />,
            ],
        };
    }
}
