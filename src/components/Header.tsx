import {AppBar, FormControlLabel, Toolbar, Typography} from '@mui/material';
import {ColorModeContext} from '../theme/ThemeContext';
import ThemeToggle from "../theme/ThemedSwitch";
import React, {useContext} from 'react';
import {useTheme} from '@mui/material/styles';

const Header = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (

        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Tic Tac Toe Game
                </Typography>
                <FormControlLabel
                    control={
                        <ThemeToggle darkMode={theme.palette.mode === 'dark'} toggleTheme={colorMode.toggleColorMode}/>
                    }
                    label={
                        <Typography variant="body2" sx={{minWidth: 50}}>
                            {theme.palette.mode === 'dark' ? 'Dark' : 'Light'}
                        </Typography>
                    }
                    labelPlacement="start"
                />

            </Toolbar>
        </AppBar>

    );
}
export default Header;
