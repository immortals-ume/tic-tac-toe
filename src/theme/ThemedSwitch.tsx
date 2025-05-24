import React from 'react';
import {Fade, FormControlLabel, styled, Switch, Typography, useMediaQuery,} from '@mui/material';

const ThemedSwitch = styled(Switch)(({theme}) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="%23fff" d="M12 2a9.77 9.77 0 0 0-1.89.19 9.997 9.997 0 1 0 11.7 11.7A10 10 0 0 0 12 2z"/></svg>'
                )}")`,
            },
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                opacity: 1,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="%23fff" d="M6.76 4.84l-1.8-1.79L2.22 6.36l1.8 1.79 2.74-3.31zM1 12h4v2H1v-2zm10-9h2v4h-2V3zm7.04 1.05l2.83 2.83-1.41 1.41-2.83-2.83 1.41-1.41zM17 12h4v2h-4v-2zM3.51 18.49l2.83-2.83 1.41 1.41-2.83 2.83-1.41-1.41zM13 17h-2v4h2v-4zm6.49-1.51l1.41 1.41-2.83 2.83-1.41-1.41 2.83-2.83z"/></svg>'
            )}")`,
        },
    },
    '& .MuiSwitch-track': {
        borderRadius: 20 / 2,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        opacity: 1,
    },
}));

interface ThemeToggleProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({darkMode, toggleTheme}) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const labelText = darkMode ? 'Dark' : 'Light';

    return (
        <FormControlLabel
            control={
                <ThemedSwitch checked={darkMode} onChange={toggleTheme}/>
            }
            label={
                <Fade in timeout={300} key={labelText}>
                    <Typography variant="body2" sx={{minWidth: 40}}>
                        {labelText}
                    </Typography>
                </Fade>
            }
            labelPlacement="start"
            sx={{ml: 2}}
        />
    );
};

export default ThemeToggle;
