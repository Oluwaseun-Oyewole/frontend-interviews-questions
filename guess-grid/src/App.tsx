import { useState } from "react";

// guess the two numbers in a grid
function App() {
  const grids = [
    [1, 3, 4, 6],
    [3, 4, 5, 7],
    [7, 1, 5, 6],
  ];
  const [isRevealed, setIsRevealed] = useState(
    new Array(grids.length)
      .fill("")
      .map(() => new Array(grids[0].length).fill(false))
  );
  const [previouslyClickedObject, setPreviouslyClickedObject] = useState<
    | {
        row: number;
        col: number;
      }
    | undefined
  >();
  const totalTrials = 9;
  const [trials, setTrials] = useState(0);

  const handleRevealCard = (rowIndex: number, colIndex: number) => {
    const newRevealed = [...isRevealed];
    newRevealed[rowIndex][colIndex] = true;
    setIsRevealed([...newRevealed]);

    if (trials !== totalTrials) {
      if (previouslyClickedObject) {
        setTrials((trial) => trial + 1);
        const isPreviouslyClicked =
          grids[previouslyClickedObject.row][previouslyClickedObject.col];
        if (isPreviouslyClicked === grids[rowIndex][colIndex]) {
          setPreviouslyClickedObject(undefined);
          if (isRevealed.flat(1).every((value) => value === true)) {
            setTimeout(() => {
              alert("You win");
            }, 200);
            setIsRevealed(
              new Array(grids.length)
                .fill("")
                .map(() => new Array(grids[0].length).fill(false))
            );
            setTrials(0);
          }
        } else {
          setPreviouslyClickedObject(undefined);
          setTimeout(() => {
            newRevealed[rowIndex][colIndex] = false;
            isRevealed[previouslyClickedObject.row][
              previouslyClickedObject.col
            ] = false;
            setIsRevealed([...newRevealed]);
          }, 500);
        }
      } else {
        setPreviouslyClickedObject({ col: colIndex, row: rowIndex });
      }
    } else {
      alert("You are a looser, lmaoo");
      setIsRevealed(
        new Array(grids.length)
          .fill("")
          .map(() => new Array(grids[0].length).fill(false))
      );
      setTrials(0);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="pb-2">trial is {trials}</h1>
          <h1 className="pb-2">Total trial : {totalTrials}</h1>
        </div>
        {grids.map((grid, rowIndex) => {
          return (
            <ul key={rowIndex} className="flex gap-3">
              {grid?.map((gridItem, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      onClick={() => handleRevealCard(rowIndex, colIndex)}
                      disabled={isRevealed[rowIndex][colIndex]}
                      className={`w-32 h-32 text-xl font-bold bg-gray-100 m-2 flex items-center justify-center rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      {isRevealed[rowIndex][colIndex] && gridItem}
                    </button>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </main>
  );
}

export default App;
