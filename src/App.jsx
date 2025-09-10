import { useState } from "react"

export default function App() {
    return (
        <div className="app">
            <Board />
        </div>
    )
}

function Square({value, onSquareClick}) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    )
}

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState('X');
    const winner = calculateWinner(squares);

    function handleTurn() {
        const currentPlayer = turn;
        setTurn(turn === 'X' ? 'O' : 'X');
        return currentPlayer;
    }
    
    function handleClick(i) {
        if (squares[i] || winner) return;

        const newSquares = squares.slice();
        newSquares[i] = handleTurn();
        setSquares(newSquares);

        if (calculateWinner(newSquares)) {
            setTimeout(() => {
                setSquares(Array(9).fill(null));
                setTurn('X');
            }, 5000);
        } else if (checkBoard(newSquares)) {
            setSquares(Array(9).fill(null));
        }
    }

    return (
        <div className="board"> 
            {squares.map((square, i) => {
                return <Square key={i} value={square} onSquareClick={() => handleClick(i)}/>
            })}
            <h2 id="winText" style={{ display: winner ? "block" : "none" }}>We Have A Winner! And That is {winner}</h2>
        </div>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

function checkBoard(squares) {
    return squares.every((mark) => mark != null);
}