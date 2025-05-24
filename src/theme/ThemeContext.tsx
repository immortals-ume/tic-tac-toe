import React, {createContext, useContext, useMemo, useState} from 'react';
import {createTheme, CssBaseline, PaletteMode, ThemeProvider} from '@mui/material';

interface ThemeContextType {
    toggleColorMode: () => void;
    mode: PaletteMode;
}

export const ColorModeContext = createContext<ThemeContextType>({
    toggleColorMode: () => {
    },
    mode: 'light',
});

export const useColorMode = () => useContext(ColorModeContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const storedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;

    const [mode, setMode] = useState<PaletteMode>(storedMode || (prefersDark ? 'dark' : 'light'));

    const toggleColorMode = () => {
        setMode((prev) => {
            const newMode = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'dark'
                        ? {
                            background: {
                                default: '#121212',
                                paper: '#1e1e1e',
                            },
                        }
                        : {
                            background: {
                                default: '#f5f5f5',
                                paper: '#fff',
                            },
                        }),
                },
                transitions: {
                    duration: {
                        standard: 300,
                    },
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={{toggleColorMode, mode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
