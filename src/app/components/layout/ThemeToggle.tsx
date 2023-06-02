import { ActionIcon, useMantineColorScheme, ColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';


export function ThemeToggle() {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });

    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    const dark = colorScheme === 'dark';

    const handleClick = () => {
        console.log(colorScheme)
        toggleColorScheme();
    }

    return (
        <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={handleClick}
            title="Toggle color scheme"
        >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
        </ActionIcon>
    );
}
