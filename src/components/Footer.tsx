import React from 'react';
import {Box, Typography, useTheme, Container, Link, Fade} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(44, 62, 80, 0.95) 0%, rgba(52, 73, 94, 0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(245, 247, 250, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)',
                backdropFilter: 'blur(10px)',
                borderTop: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease'
            }}
        >
            <Container maxWidth="lg">
                <Fade in timeout={1000}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', sm: 'row'},
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: 500,
                                textAlign: {xs: 'center', sm: 'left'}
                            }}
                        >
                            © {currentYear} Tic Tac Toe by{' '}
                            <Link
                                href="#"
                                sx={{
                                    color: theme.palette.primary.main,
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: theme.palette.primary.dark,
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Kaish
                            </Link>
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontWeight: 500
                                }}
                            >
                                Built with React & TypeScript
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default Footer;
