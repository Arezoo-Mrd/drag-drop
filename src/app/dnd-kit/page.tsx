"use client";
import DraggableList from "../components/DndKit";

export default function DndKit() {
 return (
  <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
   <DraggableList />
  </div>
 );
}
