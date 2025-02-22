import { useState } from "react";

const PLAYER_X = "X";
const PLAYER_O = "O";

function App() {
  const arrayLength = Array(9).fill("");
  const [board, setBoard] = useState(arrayLength);
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [winner, setWinner] = useState({ winStatus: "", winClass: "" });

  function handleClick(index: number) {
    const newBoard = [...board];
    if (newBoard[index]) return;
    if (winner.winStatus) return;
    newBoard[index] = playerTurn;
    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
    }
    checkWinner(newBoard);
    setBoard(newBoard);
  }

  function checkWinner(board: string[]) {
    const winningCombinations = [
      { win: [0, 1, 2], className: "strike-row-1" },
      { win: [3, 4, 5], className: "strike-row-2" },
      { win: [6, 7, 8], className: "strike-row-3" },
      { win: [0, 3, 6], className: "strike-column-1" },
      { win: [1, 4, 7], className: "strike-column-2" },
      { win: [2, 5, 8], className: "strike-column-3" },
      { win: [0, 4, 8], className: "strike-diagonal-1" },
      { win: [2, 4, 6], className: "strike-diagonal-2" },
    ];

    for (const { win, className } of winningCombinations) {
      if (
        board[win[0]] &&
        board[win[0]] === board[win[1]] &&
        board[win[0]] === board[win[2]]
      ) {
        return setWinner({
          winStatus: `${board[win[0]]} WINS`,
          winClass: className,
        });
      } else if (
        board[win[0]] !== board[win[1]] &&
        board[win[0]] !== board[win[2]] &&
        board.every((value) => value !== "")
      ) {
        return setWinner({ winStatus: "IT'S A TIE", winClass: "" });
      }
    }
    return board.includes("") ? null : "Tie";
  }

  const handleReset = () => {
    setWinner({ winClass: "", winStatus: "" });
    setBoard(arrayLength);
    setPlayerTurn(PLAYER_X);
  };

  return (
    <main className="h-screen w-screen flex-col flex items-center justify-center bg-gray-900 text-white">
      <ul className="grid grid-cols-3 w-60 relative">
        {board.map((value, index) => (
          <li key={index} className="relative">
            <button
              onClick={() => handleClick(index)}
              className={`w-20 h-20 ${
                index !== 2 && index !== 5 && index !== 8 && "border-r-2"
              } ${
                index !== 6 && index !== 7 && index !== 8 && "border-b-2"
              } border-gray-300 text-2xl font-bold flex items-center justify-center 
              ${playerTurn === PLAYER_O ? `O-hoveres` : "X-hoverss"}
              `}
            >
              {value}
            </button>
          </li>
        ))}
        <div className={`strike ${winner.winClass}`} />
      </ul>
      <div className="pt-8">{winner.winStatus}</div>
      <br />
      {winner.winStatus && <button onClick={handleReset}>RESET</button>}
    </main>
  );
}

export default App;
