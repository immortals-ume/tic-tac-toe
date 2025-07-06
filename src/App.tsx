import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Box, Container} from '@mui/material';
import Header from './components/Header';
import ChooseSymbol from './components/ChooseSymbol';
import GameInfo from './components/GameInfo';
import GameControls from './components/GameControls';
import StatsPanel from './components/Statistic';
import Footer from './components/Footer';
import Board from './components/Board';
import {GameLogic} from './logic/GameLogic';
import LandingPage from './components/LandingPage';
import {PlayerSymbol, GameMode, GameResult, BoardSquare} from './constants/gameConstants';
import {GameStats, updateStats, getWinningLine, isSoundMuted, createEmptyBoard, checkWinner} from './utils/gameUtils';
import {AudioRefs, createAudioRefs, initializeAudio, playMoveSound, playWinSound, playDrawSound} from './utils/audioUtils';
import OfflineIndicator from './components/OfflineIndicator';
import ServiceWorkerUpdate from './components/ServiceWorkerUpdate';
import InstallPrompt from './components/InstallPrompt';
import { register } from './serviceWorkerRegistration';

const App: React.FC = () => {
    const [game, setGame] = useState<GameLogic | null>(null);
    const [playerSymbol, setPlayerSymbol] = useState<PlayerSymbol | null>(null);
    const [stats, setStats] = useState<GameStats>({wins: 0, losses: 0, draws: 0, currentStreak: 0, bestStreak: 0});
    const [multiStats, setMultiStats] = useState<GameStats>({wins: 0, losses: 0, draws: 0, currentStreak: 0, bestStreak: 0});
    const [mode, setMode] = useState<GameMode | null>(null);
    const [multiBoard, setMultiBoard] = useState<BoardSquare[]>(createEmptyBoard());
    const [multiTurn, setMultiTurn] = useState<PlayerSymbol>(PlayerSymbol.X);
    const [multiWinner, setMultiWinner] = useState<PlayerSymbol | GameResult.DRAW | null>(null);
    const [multiPlayer1Symbol, setMultiPlayer1Symbol] = useState<PlayerSymbol | null>(null);

    const audioRefs = useRef<AudioRefs>(createAudioRefs());

    useEffect(() => {
        audioRefs.current = initializeAudio(audioRefs.current);
    }, []);

    useEffect(() => {
        if (game?.winner) {
            setStats(prev => updateStats(prev, game.winner, game.playerSymbol));
        }
    }, [game?.winner, game?.playerSymbol]);

    useEffect(() => {
        if (game && !game.isPlayerTurn && !game.winner) {
            const timeout = setTimeout(() => {
                const newGame = new GameLogic(game.playerSymbol);
                Object.assign(newGame, game);
                newGame.aiMove();
                setGame(newGame);
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [game]);

    useEffect(() => {
        if (game?.winner && !isSoundMuted()) {
            if (game.winner === GameResult.DRAW) {
                playDrawSound(audioRefs.current);
            } else {
                playWinSound(audioRefs.current);
            }
        }
    }, [game?.winner]);

    useEffect(() => {
        if (multiWinner && !isSoundMuted()) {
            if (multiWinner === GameResult.DRAW) {
                playDrawSound(audioRefs.current);
            } else {
                playWinSound(audioRefs.current);
            }
        }
    }, [multiWinner]);

    useEffect(() => {
        if (multiWinner) {
            setMultiStats(prev => updateStats(prev, multiWinner, multiPlayer1Symbol || PlayerSymbol.X));
        }
    }, [multiWinner, multiPlayer1Symbol]);

    useEffect(() => {
        register({
            onSuccess: (registration) => {
                console.log('Service worker registered successfully:', registration);
            },
            onUpdate: (registration) => {
                console.log('Service worker updated:', registration);
            },
        });
    }, []);

    const handleChooseSymbol = useCallback((symbol: PlayerSymbol) => {
        setPlayerSymbol(symbol);
        setGame(new GameLogic(symbol));
    }, []);

    const handleMultiChooseSymbol = useCallback((symbol: PlayerSymbol) => {
        setMultiPlayer1Symbol(symbol);
        setMultiBoard(createEmptyBoard());
        setMultiTurn(PlayerSymbol.X);
        setMultiWinner(null);
    }, []);

    const handleClick = useCallback((idx: number) => {
        if (!game || game.winner || !game.isPlayerTurn) return;
        const newGame = new GameLogic(game.playerSymbol);
        Object.assign(newGame, game);
        if (newGame.playerMove(idx)) {
            setGame(newGame);
            playMoveSound(audioRefs.current);
        }
    }, [game]);

    const handleMultiClick = useCallback((idx: number) => {
        if (multiBoard[idx] || multiWinner) return;
        const newBoard = [...multiBoard];
        newBoard[idx] = multiTurn;
        setMultiBoard(newBoard);
        playMoveSound(audioRefs.current);

        const winner = checkWinner(newBoard);
        if (winner) {
            setMultiWinner(winner);
        } else {
            setMultiTurn(multiTurn === PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X);
        }
    }, [multiBoard, multiWinner, multiTurn]);

    const resetStats = useCallback(() => setStats({wins: 0, losses: 0, draws: 0, currentStreak: 0, bestStreak: 0}), []);
    const resetMultiStats = useCallback(() => setMultiStats({wins: 0, losses: 0, draws: 0, currentStreak: 0, bestStreak: 0}), []);

    const getWinningLineForGame = useCallback((board: BoardSquare[], winner: PlayerSymbol | GameResult.DRAW | null) => {
        if (!winner || winner === GameResult.DRAW) return null;
        return getWinningLine(board, winner);
    }, []);

    const handleRestart = useCallback(() => {
        if (mode === GameMode.SINGLE) {
            setGame(null);
            setPlayerSymbol(null);
        } else if (mode === GameMode.MULTI) {
            setMultiBoard(createEmptyBoard());
            setMultiTurn(PlayerSymbol.X);
            setMultiWinner(null);
            setMultiPlayer1Symbol(null);
        }
    }, [mode]);

    const handleGoToLanding = useCallback(() => {
        setMode(null);
        setGame(null);
        setPlayerSymbol(null);
        setMultiBoard(createEmptyBoard());
        setMultiTurn(PlayerSymbol.X);
        setMultiWinner(null);
        setMultiPlayer1Symbol(null);
    }, []);

    if (!mode) {
        return (
            <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <OfflineIndicator />
                <Header onGoToLanding={handleGoToLanding}/>
                <LandingPage onSelectMode={setMode}/>
                <Footer/>
                <ServiceWorkerUpdate />
                <InstallPrompt />
            </Box>
        );
    }

    if (mode === GameMode.SINGLE && !playerSymbol) {
        return (
            <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <OfflineIndicator />
                <Header onGoToLanding={handleGoToLanding}/>
                <Container sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ChooseSymbol onChooseSymbol={handleChooseSymbol} onBack={handleGoToLanding} gameMode={GameMode.SINGLE}/>
                </Container>
                <Footer/>
                <ServiceWorkerUpdate />
                <InstallPrompt />
            </Box>
        );
    }

    if (mode === GameMode.MULTI && !multiPlayer1Symbol) {
        return (
            <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <OfflineIndicator />
                <Header onGoToLanding={handleGoToLanding}/>
                <Container sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ChooseSymbol onChooseSymbol={handleMultiChooseSymbol} onBack={handleGoToLanding} gameMode={GameMode.MULTI}/>
                </Container>
                <Footer/>
                <ServiceWorkerUpdate />
                <InstallPrompt />
            </Box>
        );
    }

    return (
        <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <OfflineIndicator />
            <Header onGoToLanding={handleGoToLanding}/>
            <Container sx={{flex: 1, py: 4}}>
                {mode === GameMode.SINGLE && game ? (
                    <>
                        <Board
                            squares={game.board}
                            onClick={handleClick}
                            winningLine={getWinningLineForGame(game.board, game.winner)}
                        />
                        <GameInfo
                            winner={game.winner}
                            isPlayerTurn={game.isPlayerTurn}
                            playerSymbol={game.playerSymbol}
                            aiSymbol={game.aiSymbol}
                            gameMode={GameMode.SINGLE}
                        />
                        <GameControls onRestart={handleRestart}/>
                        <StatsPanel
                            stats={stats}
                            playerSymbol={game.playerSymbol}
                            onResetStats={resetStats}
                            gameMode={GameMode.SINGLE}
                        />
                    </>
                ) : (
                    <>
                        <Board
                            squares={multiBoard}
                            onClick={handleMultiClick}
                            winningLine={getWinningLineForGame(multiBoard, multiWinner)}
                        />
                        <GameInfo
                            winner={multiWinner}
                            isPlayerTurn={multiTurn === (multiPlayer1Symbol || PlayerSymbol.X)}
                            playerSymbol={multiTurn}
                            aiSymbol={multiTurn === PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X}
                            gameMode={GameMode.MULTI}
                        />
                        <GameControls onRestart={handleRestart}/>
                        <StatsPanel
                            stats={multiStats}
                            playerSymbol={multiPlayer1Symbol}
                            onResetStats={resetMultiStats}
                            gameMode={GameMode.MULTI}
                        />
                    </>
                )}
            </Container>
            <Footer/>
            <ServiceWorkerUpdate />
            <InstallPrompt />
        </Box>
    );
};

export default App;
