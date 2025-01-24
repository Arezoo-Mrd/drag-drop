import React, { CSSProperties, useState } from "react";
import {
 DndContext,
 useDraggable,
 DragOverlay,
 DragStartEvent,
 UniqueIdentifier,
 DragEndEvent,
} from "@dnd-kit/core";

const DraggableItem = ({
 id,
 x,
 y,
 text,
 onDragEnd,
}: {
 id: string;
 x: number;
 y: number;
 text: string;
 onDragEnd?: (id: string, x: number, y: number) => void;
}) => {
 const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
  id,
 });

 const style: CSSProperties = {
  left: x,
  top: y,
  backgroundColor: isDragging ? "#007bff" : "#f0f0f0",
  color: isDragging ? "white" : "black",
  zIndex: isDragging ? 1000 : 1,
  opacity: isDragging ? 0.7 : 1,
 };

 return (
  <div
   ref={setNodeRef}
   style={style}
   className="cursor-grab rounded-md border border-slate-700 px-5 py-3 font-bold absolute"
   {...listeners}
   {...attributes}
   onMouseUp={(e) => {
    if (onDragEnd) {
     onDragEnd(id, e.clientX, e.clientY);
    }
   }}
  >
   {text}
  </div>
 );
};

const FreeDragAndDrop = () => {
 const [items, setItems] = useState([
  { id: "1", x: 50, y: 50, text: "Item 1" },
  { id: "2", x: 200, y: 100, text: "Item 2" },
  { id: "3", x: 100, y: 200, text: "Item 3" },
 ]);
 const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

 const handleDragStart = (event: DragStartEvent) => {
  setActiveId(event.active.id);
 };

 const handleDragEnd = (event: DragEndEvent) => {
  const { active, delta } = event;

  if (delta && activeId) {
   setItems((prevItems) =>
    prevItems.map((item) =>
     item.id === active.id
      ? { ...item, x: item.x + delta.x, y: item.y + delta.y }
      : item
    )
   );
  }
  setActiveId(null);
 };

 return (
  <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
   <div className="w-full h-screen relative border-2 border-dashed border-white">
    {items.map((item) => (
     <DraggableItem
      key={item.id}
      id={item.id}
      x={item.x}
      y={item.y}
      text={item.text}
     />
    ))}
   </div>
   <DragOverlay>
    {activeId && (
     <div className="text-white bg-[#007bff]  p-3 rounded-md cursor-grab border">
      {items.find((item) => item.id === activeId)?.text}
     </div>
    )}
   </DragOverlay>
  </DndContext>
 );
};

export default FreeDragAndDrop;
