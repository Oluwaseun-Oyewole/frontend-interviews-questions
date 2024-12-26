import { useState } from "react";

function App() {
  const [positions, setPositions] = useState<
    { screenX: number; screenY: number }[]
  >([]);
  const [redoPositions, setRedoPositions] = useState<
    { screenX: number; screenY: number }[]
  >([]);

  const handleMouseEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    setPositions((positions) => [
      ...positions,
      { screenX: e.clientX, screenY: e.clientY },
    ]);
    return;
  };

  const handleUndo = () => {
    const newPositions = [...positions];
    const popped = newPositions.pop();
    setPositions(newPositions);
    setRedoPositions((positions) => [
      ...positions,
      {
        screenX: popped?.screenX as number,
        screenY: popped?.screenY as number,
      },
    ]);
  };

  const handleRedo = () => {
    if (redoPositions.length === 0) return;
    const newPopped = redoPositions.pop();
    const pos = [...positions];
    pos.push(newPopped!);
    setPositions([...pos]);
  };
  const renderCircle = () => {
    return positions?.map((position, index) => {
      return (
        <>
          <div
            key={index}
            style={{ left: position.screenX - 5, top: position.screenY - 5 }}
            className={`bg-red-500 w-5 h-5 rounded-full absolute`}
          ></div>
        </>
      );
    });
  };

  return (
    <>
      <button onClick={handleUndo}>Undo</button>
      <br />
      <button
        onClick={handleRedo}
        disabled={redoPositions.length === 0}
        className="disabled:bg-gray-200"
      >
        Redo
      </button>
      <div
        onClick={(e) => handleMouseEvent(e)}
        className="h-screen  w-full relative"
      >
        {renderCircle()}
      </div>
    </>
  );
}

export default App;
