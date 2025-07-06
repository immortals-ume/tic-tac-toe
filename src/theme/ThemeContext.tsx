import React, {createContext, useContext, useMemo, useState} from 'react';
import {createTheme, CssBaseline, PaletteMode, ThemeProvider} from '@mui/material';

interface ThemeContextType {
    toggleColorMode: () => void;
    mode: PaletteMode;
}

export const ColorModeContext = createContext<ThemeContextType>({
    toggleColorMode: () => {},
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
                    primary: {
                        main: mode === 'dark' ? '#90caf9' : '#1976d2',
                    },
                    secondary: {
                        main: mode === 'dark' ? '#f48fb1' : '#dc004e',
                    },
                    background: {
                        default: mode === 'dark' ? '#121212' : '#f5f5f5',
                        paper: mode === 'dark' ? '#1e1e1e' : '#fff',
                    },
                    text: {
                        primary: mode === 'dark' ? '#fff' : '#2c3e50',
                        secondary: mode === 'dark' ? '#b0b0b0' : '#34495e',
                    },
                    success: {
                        main: mode === 'dark' ? '#4caf50' : '#27ae60',
                    },
                    error: {
                        main: mode === 'dark' ? '#f44336' : '#e74c3c',
                    },
                    warning: {
                        main: mode === 'dark' ? '#ff9800' : '#f39c12',
                    },
                    info: {
                        main: mode === 'dark' ? '#2196f3' : '#3498db',
                    },
                    grey: {
                        500: mode === 'dark' ? '#9e9e9e' : '#95a5a6',
                    },
                },
                components: {
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                backgroundImage: 'none',
                            },
                        },
                    },
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
