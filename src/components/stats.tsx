import React from 'react';

type Player = 'X' | 'O';

interface Stats {
    wins: Record<Player, number>;
    losses: Record<Player, number>;
    draws: Record<Player, number>;
}

interface StatsDisplayProps {
    stats: Stats;
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 300 }}>
            <h3>Game Stats</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th></th>
                    <th style={{ textAlign: 'center' }}>X</th>
                    <th style={{ textAlign: 'center' }}>O</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Wins</td>
                    <td style={{ textAlign: 'center' }}>{stats.wins.X}</td>
                    <td style={{ textAlign: 'center' }}>{stats.wins.O}</td>
                </tr>
                <tr>
                    <td>Losses</td>
                    <td style={{ textAlign: 'center' }}>{stats.losses.X}</td>
                    <td style={{ textAlign: 'center' }}>{stats.losses.O}</td>
                </tr>
                <tr>
                    <td>Draws</td>
                    <td style={{ textAlign: 'center' }}>{stats.draws.X}</td>
                    <td style={{ textAlign: 'center' }}>{stats.draws.O}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
