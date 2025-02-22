import { useState } from "react";

function App() {
  const BOARD_SIZE = 10;
  const boardFrame = new Array(BOARD_SIZE)
    .fill("")
    .map(() => new Array(BOARD_SIZE).fill(null));
  const [boards, setBoards] = useState(boardFrame);
  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white">
      <ul className="grid grid-cols-10">
        {boards?.map((rows) => {
          return rows?.map((col, col_index) => {
            return (
              <li
                key={col_index}
                className="w-16 h-16 border-2 border-gray-500 flex items-center justify-center"
              >
                {col}
              </li>
            );
          });
        })}
      </ul>
    </main>
  );
}

export default App;
