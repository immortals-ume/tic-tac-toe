import React from 'react';
import {Button, Container} from '@mui/material';

interface LandingProps {
    onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({onStart}) => (
    <Container sx={{textAlign: 'center', py: 10}}>
        <Button variant="contained" size="large" onClick={onStart}>
            Play
        </Button>
    </Container>
);

export default Landing;
