import React, { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Xác định người thắng cuộc
  useEffect(() => {
    const gameWinner = calculateWinner(squares);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  }, [squares]);

  // Hàm kiểm tra người chơi chiến thắng
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // console.log(squares[a]);
      // console.log(squares[b]);
      // console.log(squares[c]);
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // Xử lý khi người chơi click vào ô
  const handleClick = (i) => {
    if (winner || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    console.log(squares);
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  // Khởi động lại trò chơi
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="main">
      <h2 className="result">Người thắng: {winner ? winner : "Chưa có"}</h2>
      <div className="game">
        <span className="player">
          Người chơi tiếp theo: {xIsNext ? "X" : "O"}
        </span>
        <Board squares={squares} handleClick={handleClick} />
      </div>
      <button onClick={handleRestart} className="restart-btn">
        Khởi động lại
      </button>
    </div>
  );
}

export default Game;
