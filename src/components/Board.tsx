import React from 'react';
import {Box, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

interface BoardProps {
    squares: (string | null)[];
    onClick: (idx: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
    const renderIcon = (value: string | null) => {
        if (value === 'X') return <CloseIcon fontSize="inherit"/>;
        if (value === 'O') return <RadioButtonUncheckedIcon fontSize="inherit"/>;
        return null;
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 100px)',
                gap: 1,
                margin: '20px auto',
                width: 310,
            }}
        >
            {squares.map((value, idx) => (
                <Button
                    key={idx}
                    onClick={() => onClick(idx)}
                    variant="outlined"
                    disabled={!!value}
                    sx={{
                        width: 100,
                        height: 100,
                        fontSize: 48,
                        minWidth: 0,
                        border: '2px solid #444',
                        borderRadius: 1,
                        color: value ? '#000' : '#888',
                    }}
                >
                    {renderIcon(value)}
                </Button>
            ))}
        </Box>
    );
};

export default Board;
