import { useState } from "react";
import { treeData } from "./data";

function App() {
  const [treeDataItems, setTreeDataItems] = useState<File[]>(treeData);
  const [sourceFolderId, setSourceFolderId] = useState<number | null>(null);
  const [sourceFileId, setSourceFileId] = useState<number | null>(null);
  return (
    <div className="flex items-center justify-center h-screen gap-14">
      <FileTree
        trees={treeDataItems}
        setTreeDataItems={setTreeDataItems}
        treeDataItems={treeDataItems}
        sourceFolderId={sourceFolderId}
        setSourceFolderId={setSourceFolderId}
        sourceFileId={sourceFileId}
        setSourceFileId={setSourceFileId}
      />
    </div>
  );
}

function FileNode({
  node,
  setTreeDataItems,
  treeDataItems,
  setSourceFolderId,
  sourceFolderId,
  sourceFileId,
  setSourceFileId,
}: {
  node: File;
  setTreeDataItems: React.Dispatch<React.SetStateAction<File[]>>;
  treeDataItems: File[];
  sourceFolderId: number | null;
  setSourceFolderId: React.Dispatch<React.SetStateAction<number | null>>;
  sourceFileId: number | null;
  setSourceFileId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  function onFolderDrag(id: number) {
    const startIndex = treeDataItems.findIndex(
      (item) => item.id === sourceFolderId
    );
    const stopIndex = treeDataItems.findIndex((item) => item.id === id);
    const updatedTree = [...treeDataItems];
    const [startArray] = updatedTree.splice(startIndex, 1);
    if (startIndex > stopIndex)
      updatedTree[stopIndex].children?.push(startArray);
    else updatedTree[startIndex].children?.push(startArray);
    setTreeDataItems(updatedTree);
    setSourceFolderId(null);
  }

  if (node?.children) {
    return (
      <div>
        <button
          draggable={!!node?.children}
          onDragStart={() => setSourceFolderId(node.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onFolderDrag(node.id)}
          className="bg-green-700 text-xs px-5 py-2 rounded-lg cursor-pointer mb-2"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "-" : "+"} {node.name} {node.id}
        </button>

        {isExpanded && (
          <ul className="my-2 rounded-lg">
            {node?.children
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((tree) => {
                return (
                  <li className="mb-2" key={tree.id}>
                    <FileNode
                      node={tree}
                      setTreeDataItems={setTreeDataItems}
                      treeDataItems={treeDataItems}
                      sourceFolderId={sourceFolderId}
                      setSourceFolderId={setSourceFolderId}
                      sourceFileId={sourceFileId}
                      setSourceFileId={setSourceFileId}
                    />
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    );
  } else
    return (
      <button
        className="text-xs rounded-lg cursor-pointer ml-5"
        draggable={true}
        onDragStart={() => setSourceFolderId(node.id)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => onFolderDrag(node.id)}
      >
        {node.name} {node.id}
      </button>
    );
}
function FileTree({
  trees,
  setTreeDataItems,
  treeDataItems,
  setSourceFolderId,
  sourceFolderId,
  sourceFileId,
  setSourceFileId,
}: {
  trees: File[];
  setTreeDataItems: React.Dispatch<React.SetStateAction<File[]>>;
  treeDataItems: File[];
  sourceFolderId: number | null;
  setSourceFolderId: React.Dispatch<React.SetStateAction<number | null>>;
  sourceFileId: number | null;
  setSourceFileId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return trees
    ?.sort((a, b) => a.name.localeCompare(b.name))
    .map((tree) => (
      <FileNode
        node={tree}
        key={tree.id}
        setTreeDataItems={setTreeDataItems}
        treeDataItems={treeDataItems}
        sourceFolderId={sourceFolderId}
        setSourceFolderId={setSourceFolderId}
        sourceFileId={sourceFileId}
        setSourceFileId={setSourceFileId}
      />
    ));
}
type File = {
  id: number;
  name: string;
  children?: File[];
};

export default App;
// function DragDrop() {
//   const items_array = [
//     { id: 1, text: "Item 1" },
//     { id: 2, text: "Item 2" },
//     { id: 3, text: "Item 3" },
//     { id: 4, text: "Item 4" },
//   ];
//   const [items, setItems] = useState(items_array);
//   const [dragItemId, setDragItemId] = useState<number | null>(null);

//   function onDrop(targetId: number) {
//     if (!targetId || targetId === dragItemId) return;
//     const startIndex = items.findIndex((item) => item.id === dragItemId);
//     const targetIndex = items.findIndex((item) => item.id === targetId);

//     const updatedItems = [...items];
//     const [dragItem] = updatedItems.splice(startIndex, 1);
//     updatedItems.splice(targetIndex, 0, dragItem);

//     setItems(updatedItems);
//     setDragItemId(null);
//   }

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <ul className="flex items-center gap-5">
//         {items.map((item) => (
//           <li
//             draggable
//             onDragStart={() => setDragItemId(item.id)}
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={() => onDrop(item.id)}
//             key={item.id}
//             className="h-60 w-60 bg-gray-800 flex items-center justify-center rounded-lg"
//           >
//             {item.text}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
