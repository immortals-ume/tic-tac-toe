import React, {useEffect, useState} from 'react';
import {Box, Container} from '@mui/material';
import Header from './components/Header';
import SymbolChooser from './components/ChooseSymbol';
import GameInfo from './components/GameInfo';
import GameControls from './components/GameControls';
import StatsPanel from './components/Statistic';
import Footer from './components/Footer';
import Board from './components/Board';
import {GameLogic} from './logic/GameLogic';


const App: React.FC = () => {
    const [game, setGame] = useState<GameLogic | null>(null);
    const [playerSymbol, setPlayerSymbol] = useState<'X' | 'O' | null>(null);
    const [stats, setStats] = useState({wins: 0, losses: 0, draws: 0});


    useEffect(() => {
        if (game?.winner) {
            setStats(prev => {
                if (game.winner === 'Draw') return {...prev, draws: prev.draws + 1};
                if (game.winner === game.playerSymbol) return {...prev, wins: prev.wins + 1};
                return {...prev, losses: prev.losses + 1};
            });
        }
    }, [game?.winner]);

    useEffect(() => {
        if (game && !game.isPlayerTurn && !game.winner) {
            const newGame = new GameLogic(game.playerSymbol);
            Object.assign(newGame, game);
            newGame.aiMove();
            setGame(newGame);
        }
    }, [game]);

    const handleChooseSymbol = (symbol: 'X' | 'O') => {
        setPlayerSymbol(symbol);
        setGame(new GameLogic(symbol));
    };

    const handleClick = (idx: number) => {
        if (!game || game.winner || !game.isPlayerTurn) return;
        const newGame = new GameLogic(game.playerSymbol);
        Object.assign(newGame, game);
        if (newGame.playerMove(idx)) setGame(newGame);
    };

    const resetGame = () => {
        setPlayerSymbol(null);
        setGame(null);
    };

    const resetStats = () => setStats({wins: 0, losses: 0, draws: 0});

    return (

        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header/>
            <Container sx={{flexGrow: 1, textAlign: 'center', py: 5}}>
                {!playerSymbol ? (
                    <SymbolChooser onChoose={handleChooseSymbol}/>
                ) : (
                    <>
                        <Board squares={game?.board || Array(9).fill(null)} onClick={handleClick}/>
                        <GameInfo
                            winner={game?.winner || null}
                            isPlayerTurn={game?.isPlayerTurn || false}
                            playerSymbol={game?.playerSymbol || 'X'}
                            aiSymbol={game?.aiSymbol || 'O'}
                        />
                        <GameControls onRestart={resetGame}/>
                        <StatsPanel stats={stats} playerSymbol={playerSymbol} onResetStats={resetStats}/>
                    </>
                )}
            </Container>
            <Footer/>
        </Box>
    );
};

export default App;
