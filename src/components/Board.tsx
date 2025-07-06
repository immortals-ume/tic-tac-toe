import React, { useEffect, useRef, useCallback } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { BoardSquare } from '../constants/gameConstants';
import { playMoveSound, createAudioRefs, initializeAudio } from '../utils/audioUtils';

export interface BoardProps {
    squares: BoardSquare[];
    onClick: (idx: number) => void;
    winningLine?: number[] | null;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
    const theme = useTheme();
    const prevSquares = useRef<BoardSquare[]>(squares);
    const audioRefs = useRef(createAudioRefs());
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        audioRefs.current = initializeAudio(audioRefs.current);
    }, []);

    useEffect(() => {
        const prev = prevSquares.current;
        if (prev && squares) {
            const prevCount = prev.filter(Boolean).length;
            const currCount = squares.filter(Boolean).length;
            if (currCount > prevCount) {
                playMoveSound(audioRefs.current);
            }
        }
        prevSquares.current = squares;
    }, [squares]);

    const renderIcon = (value: BoardSquare) => {
        if (value === 'X') return <CloseIcon fontSize="inherit"/>;
        if (value === 'O') return <RadioButtonUncheckedIcon fontSize="inherit"/>;
        return null;
    };

    const isWinningSquare = (index: number): boolean => {
        return winningLine ? winningLine.includes(index) : false;
    };

    const handleSquareClick = useCallback((index: number) => {
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
        }

        clickTimeoutRef.current = setTimeout(() => {
            onClick(index);
        }, 0);
    }, [onClick]);

    useEffect(() => {
        return () => {
            if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
            }
        };
    }, []);

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: { xs: 1, sm: 2 },
            maxWidth: { xs: 280, sm: 350, md: 400 },
            width: '100%',
            mx: 'auto',
            mb: 3,
            px: { xs: 1, sm: 0 }
        }}>
            {squares.map((value, index) => (
                <Paper
                    key={index}
                    elevation={3}
                    sx={{
                        aspectRatio: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        fontWeight: 'bold',
                        cursor: value ? 'default' : 'pointer',
                        transition: 'all 0.3s ease',
                        minHeight: { xs: 80, sm: 100, md: 120 },
                        background: isWinningSquare(index)
                            ? theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)'
                                : 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)'
                            : theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, #424242 0%, #616161 100%)'
                                : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                        color: isWinningSquare(index) ? 'white' : theme.palette.text.primary,
                        border: isWinningSquare(index)
                            ? `3px solid ${theme.palette.success.main}`
                            : `2px solid ${theme.palette.divider}`,
                        transform: isWinningSquare(index) ? 'scale(1.05)' : 'scale(1)',
                        '&:hover': value ? {} : {
                            transform: 'scale(1.05)',
                            boxShadow: theme.shadows[8],
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, #616161 0%, #757575 100%)'
                                : 'linear-gradient(135deg, #e0e0e0 0%, #d5d5d5 100%)'
                        },
                        '&:active': value ? {} : {
                            transform: 'scale(0.95)'
                        }
                    }}
                    onClick={() => !value && handleSquareClick(index)}
                >
                    {renderIcon(value)}
                </Paper>
            ))}
        </Box>
    );
};

export default Board;
