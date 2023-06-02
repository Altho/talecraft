'use client';
import { createStyles, Navbar, Group, Code, getStylesRef, rem } from '@mantine/core';
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

import {
    IconLogout,
    IconLogin,
    IconSettings,
    IconPlus,
    IconMap
} from '@tabler/icons-react';
import {ThemeToggle} from "@/app/components/layout/ThemeToggle";


const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.colorScheme === 'dark' ? 'dark' : 'blue' }).background,
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
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
                    <ThemeToggle/>
                </Group>
                <a href="/" className={classes.link} >
                    <IconPlus className={classes.linkIcon} stroke={1.5} />
                    <span>New Tale</span>
                </a>
                <a href="/" className={classes.link} >
                    <IconMap className={classes.linkIcon} stroke={1.5} />
                    <span>Manage Tales</span>
                </a>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a href="/" className={classes.link} >
                    <IconSettings className={classes.linkIcon} stroke={1.5} />
                    <span>Settings</span>
                </a>
                {status === "authenticated" ? <a href="#" className={classes.link} onClick={() => signOut()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a> : <a href="/api/auth/signin" className={classes.link} >
                    <IconLogin className={classes.linkIcon} stroke={1.5} />
                    <span>Sign in</span>
                </a>  }

            </Navbar.Section>
        </Navbar>
    );
}
