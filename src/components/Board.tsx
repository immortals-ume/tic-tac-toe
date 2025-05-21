import React from 'react';

interface BoardProps {
    squares: (string | null)[];
    onClick: (idx: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 100px)',
            gridGap: 5,
            margin: '20px auto',
            width: 310
        }}>
            {squares.map((value, idx) => (
                <button
                    key={idx}
                    onClick={() => onClick(idx)}
                    style={{
                        width: 100,
                        height: 100,
                        fontSize: 48,
                        cursor: value ? 'default' : 'pointer',
                        backgroundColor: '#fff',
                        border: '2px solid #444',
                        borderRadius: 5,
                    }}
                    disabled={!!value}
                >
                    {value}
                </button>
            ))}
        </div>
    );
};

export default Board;
