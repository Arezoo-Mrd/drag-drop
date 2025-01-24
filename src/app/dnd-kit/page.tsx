"use client";
import { useState } from "react";
import DraggableList from "../components/DndKit";
import FreeDragAndDrop from "../components/ReactDnd/LikeMirror";

export default function DndKit() {
 const [sortable, setSortable] = useState(false);
 return (
  <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
   <button
    className="bg-blue-500 hover:bg-blue-700 mb-4 text-white font-bold py-2 px-4 rounded"
    onClick={() => setSortable(!sortable)}
   >
    {`Show Draggable List Sortable: ${sortable ? "Yes" : "No"}`}
   </button>
   {sortable ? <DraggableList /> : <FreeDragAndDrop />}
  </div>
 );
}
