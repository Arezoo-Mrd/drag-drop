/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
 DndContext,
 closestCenter,
 KeyboardSensor,
 PointerSensor,
 useSensor,
 useSensors,
} from "@dnd-kit/core";
import {
 arrayMove,
 SortableContext,
 sortableKeyboardCoordinates,
 verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

export default function DraggableList() {
 const [items, setItems] = useState([
  {
   title: "Item 1",
   color: "#CF7B3B",
  },
  {
   title: "Item 2",
   color: "#F96C0E",
  },
  {
   title: "Item 3",
   color: "#4FF3EB",
  },
  {
   title: "Item 4",
   color: "#A42A9B",
  },
 ]);
 const sensors = useSensors(
  useSensor(PointerSensor),
  useSensor(KeyboardSensor, {
   coordinateGetter: sortableKeyboardCoordinates,
  })
 );

 const handleDragEnd = (event: any) => {
  const { active, over } = event;

  if (active.id !== over.id) {
   setItems((items) => {
    const oldIndex = items.findIndex((item) => item.title === active.id);
    const newIndex = items.findIndex((item) => item.title === over.id);
    return arrayMove(items, oldIndex, newIndex);
   });
  }
 };

 return (
  <DndContext
   sensors={sensors}
   collisionDetection={closestCenter}
   onDragEnd={handleDragEnd}
  >
   <div
    className=" w-fit h-full p-10 border-2 rounded-lg border-dashed flex justify-center border-white
 "
   >
    <SortableContext
     items={items.map((item) => item.title)}
     strategy={verticalListSortingStrategy}
    >
     <div className=" grid grid-cols-2">
      {items.map((item) => (
       <SortableItem key={item.title} id={item.title} color={item.color} />
      ))}
     </div>
    </SortableContext>
   </div>
  </DndContext>
 );
}
