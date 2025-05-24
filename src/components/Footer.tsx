import React from 'react';
import {Box, Typography} from '@mui/material';

const Footer = () => (
    <Box component="footer" sx={{py: 2, px: 2, mt: 'auto', backgroundColor: '#1976d2', color: '#fff'}}>
        <Typography align="center" variant="body2">
            © {new Date().getFullYear()} Tic Tac Toe by Kaish
        </Typography>
    </Box>
);

export default Footer;
