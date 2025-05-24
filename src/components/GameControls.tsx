import React from 'react';
import {Button} from '@mui/material';

interface GameControlsProps {
    onRestart: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({onRestart}) => (
    <Button variant="outlined" onClick={onRestart} sx={{mb: 3}}>
        Restart Game
    </Button>
);

export default GameControls;
