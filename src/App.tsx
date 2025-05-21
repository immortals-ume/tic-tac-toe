import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import { GameLogic} from './logic/GameLogic';

const App: React.FC = () => {
    const [game, setGame] = useState<GameLogic | null>(null);
    const [playerSymbol, setPlayerSymbol] = useState<'X' | 'O' | null>(null);
    const [stats, setStats] = useState({
        wins: 0,
        losses: 0,
        draws: 0
    });

    useEffect(() => {
        if (game?.winner) {
            setStats(prevStats => {
                if (game.winner === 'Draw') {
                    return { ...prevStats, draws: prevStats.draws + 1 };
                } else if (game.winner === game.playerSymbol) {
                    return { ...prevStats, wins: prevStats.wins + 1 };
                } else {
                    return { ...prevStats, losses: prevStats.losses + 1 };
                }
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

        if (newGame.playerMove(idx)) {
            setGame(newGame);
        }
    };

    const resetGame = () => {
        setPlayerSymbol(null);
        setGame(null);
    };
    const resetStats = () => {
        setStats({
            wins: 0,
            losses: 0,
            draws: 0
        });
    };




    if (!playerSymbol) {
        return (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
                <h1>Choose your symbol</h1>
                <button onClick={() => handleChooseSymbol('X')} style={{ marginRight: 20, padding: '10px 20px', fontSize: 24 }}>
                    X
                </button>
                <button onClick={() => handleChooseSymbol('O')} style={{ padding: '10px 20px', fontSize: 24 }}>
                    O
                </button>
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
            <h1>Tic Tac Toe</h1>
            <Board squares={game?.board || Array(9).fill(null)} onClick={handleClick} />
            <div style={{ fontSize: 24, margin: '20px 0' }}>
                {game ? (
                    game.winner ? (
                        game.winner === 'Draw' ? "It's a Draw!" : `Winner: ${game.winner}`
                    ) : (
                        `Next player: ${game.isPlayerTurn ? 'You' : 'AI'} (${game.isPlayerTurn ? game.playerSymbol : game.aiSymbol})`
                    )
                ) : (
                    "Please start the game."
                )}
            </div>
            <button onClick={resetGame} style={{ padding: '10px 20px', fontSize: 16 }}>
                Restart Game
            </button>

            <div style={{ margin: '20px 0', fontSize: 18 }}>
                <h2>Statistics</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <div>Wins: {stats.wins}</div>
                    <div>Losses: {stats.losses}</div>
                    <div>Draws: {stats.draws}</div>
                </div>
            </div>

            <button
                onClick={resetStats}
                style={{
                    padding: '5px 10px',
                    fontSize: 14,
                    marginTop: '10px'
                }}
            >
                Reset Stats
            </button>
        </div>
    );
};

export default App;
