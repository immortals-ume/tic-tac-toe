import React from 'react';
import {Button, Container, Typography} from '@mui/material';

interface SymbolSelectionProps {
    onChooseSymbol: (symbol: 'X' | 'O') => void;
}

const SymbolSelection: React.FC<SymbolSelectionProps> = ({onChooseSymbol}) => (
    <Container sx={{textAlign: 'center', py: 5}}>
        <Typography variant="h4" gutterBottom>
            Choose your symbol
        </Typography>
        <Button variant="contained" onClick={() => onChooseSymbol('X')} sx={{mr: 2}} size="large">
            X
        </Button>
        <Button variant="contained" onClick={() => onChooseSymbol('O')} size="large">
            O
        </Button>
    </Container>
);

export default SymbolSelection;
