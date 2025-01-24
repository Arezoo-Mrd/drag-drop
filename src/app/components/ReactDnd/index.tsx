import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "./DraggableItem";

const DragAndDrop = () => {
 const [items, setItems] = useState([
  {
   text: "Item 1",
   color: "#CF7B3B",
  },
  {
   text: "Item 2",
   color: "#F96C0E",
  },
  {
   text: "Item 3",
   color: "#4FF3EB",
  },
  {
   text: "Item 4",
   color: "#A42A9B",
  },
 ]);

 const moveItem = (fromIndex: number, toIndex: number) => {
  const updatedItems = [...items];
  const [movedItem] = updatedItems.splice(fromIndex, 1);
  updatedItems.splice(toIndex, 0, movedItem);
  setItems(updatedItems);
 };

 return (
  <DndProvider backend={HTML5Backend}>
   <h3 className="font-bold text-white text-2xl">
    Drag and Drop With React DND
   </h3>
   <div className="w-fit h-screen grid grid-cols-2 ">
    {items.map((item, index) => (
     <DraggableItem
      key={index}
      item={item.text}
      index={index}
      moveItem={moveItem}
      backgroundColor={item.color}
     />
    ))}
   </div>
  </DndProvider>
 );
};

export default DragAndDrop;
