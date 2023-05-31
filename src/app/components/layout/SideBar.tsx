'use client';
import { useState } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem } from '@mantine/core';
import { useSession } from "next-auth/react"

import {
    IconBellRinging,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLogout,
} from '@tabler/icons-react';


const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        position: 'sticky',
        top: 0,
        left: 0,
        height: '100vh',
    },

    version: {
        backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            0.1
        ),
        color: theme.white,
        fontWeight: 700,
    },

    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            0.1
        )}`,
    },

    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            0.1
        )}`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.white,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
                0.1
            ),
        },
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.white,
        opacity: 0.75,
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
                0.15
            ),
            [`& .${getStylesRef('icon')}`]: {
                opacity: 0.9,
            },
        },
    },
}));



export function SideBar() {
    const { classes, cx } = useStyles();
    const { data: session, status } = useSession()


    return (
        <Navbar height={700} width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <Code className={classes.version}>v3.1.2</Code>
                </Group>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </a>

                {status === "authenticated" ? <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a> : <a href="/api/auth/signin" className={classes.link} /> }

            </Navbar.Section>
        </Navbar>
    );
}
