import { useState } from "react";

export default function App() {
  return (
    <div className="app">
      <Board />
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [message, setMessage] = useState();
  const winner = calculateWinner(squares);

  function handleTurn() {
    const currentPlayer = turn;
    setTurn(turn === "X" ? "O" : "X");
    return currentPlayer;
  }

  function handleClick(i) {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = handleTurn();
    setSquares(newSquares);

    if (calculateWinner(newSquares)) {
      setMessage("Resetting in 5 seconds...");

      setTimeout(() => {
        setSquares(Array(9).fill(null));
        setTurn("X");
        setMessage(null);
      }, 5000);
    } else if (checkBoard(newSquares)) {
      setMessage("Board full! Resetting in 5 seconds");
      
      setTimeout(() => {
        setSquares(Array(9).fill(null));
        setMessage(null);
      }, 5000);
    }
  }

  return (
    <div className="boardContainer">
      <div className="board">
        {squares.map((square, i) => (
          <Square 
            key={i}
            value={square}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </div>

      <div className="info">
        <h2
          id="winText"
          style={{ display: winner ? "flex" : "none" }}
        >
          We Have A Winner! And That is {winner}
        </h2>
        {message && (
          <p>{message}</p>
        )}
        <span>Turn: {turn}</span>
      </div>
    </div>
  );
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