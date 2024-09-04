import React, { useState } from "react";
import "./index.css";

const ROWS = 15;
const COLS = 15;

type Player = "X" | "O" | null;

const Board: React.FC = () => {
  const [board, setBoard] = useState<Player[][]>(
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(null))
  );
  console.log(board);
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player>(null);

  const handleClick = (row: number, col: number) => {
    if (board[row][col] || winner) return;
    console.log(row, col);
    const newBoard = board.map((row) => row.slice()) as Player[][];
    newBoard[row][col] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newWinner = calculateWinner(newBoard, row, col);
    if (newWinner) setWinner(newWinner);
  };

  const calculateWinner = (
    board: Player[][],
    row: number,
    col: number
  ): Player => {
    const directions = [
      { r: 1, c: 0 }, // horizontal
      { r: 0, c: 1 }, // vertical
      { r: 1, c: 1 }, // diagonal \
      { r: 1, c: -1 }, // diagonal /
    ];
    const player = board[row][col];

    for (const { r: dr, c: dc } of directions) {
      let count = 1;

      for (let i = 1; i < 5; i++) {
        const newRow = row + i * dr;
        const newCol = col + i * dc;
        if (
          newRow < 0 ||
          newRow >= ROWS ||
          newCol < 0 ||
          newCol >= COLS ||
          board[newRow][newCol] !== player
        )
          break;
        count++;
      }

      for (let i = 1; i < 5; i++) {
        const newRow = row - i * dr;
        const newCol = col - i * dc;
        if (
          newRow < 0 ||
          newRow >= ROWS ||
          newCol < 0 ||
          newCol >= COLS ||
          board[newRow][newCol] !== player
        )
          break;
        count++;
      }

      if (count >= 5) return player;
    }

    return null;
  };

  return (
    <div className="board">
      {board.map((row, rIndex) => (
        <div key={rIndex} className="row">
          {row.map((cell, cIndex) => (
            <div
              key={cIndex}
              className={`cell ${cell ? cell : ""}`}
              onClick={() => handleClick(rIndex, cIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
      {winner && <div className="winner">Winner: {winner}</div>}
    </div>
  );
};

export default Board;
