import { useDrag, useDrop } from "react-dnd";

const ItemType = {
 ITEM: "ITEM",
};

const DraggableItem = ({
 item,
 index,
 moveItem,
 backgroundColor,
}: {
 item: string;
 index: number;

 moveItem: (fromIndex: number, toIndex: number) => void;
 backgroundColor: string;
}) => {
 const [, dragRef] = useDrag({
  type: ItemType.ITEM,
  item: { index },
 });

 const [, dropRef] = useDrop({
  accept: ItemType.ITEM,
  hover: (draggedItem: {
   item: string;
   index: number;
   moveItem: (fromIndex: number, toIndex: number) => void;
  }) => {
   if (draggedItem.index !== index) {
    moveItem(draggedItem.index, index);
    draggedItem.index = index;
   }
  },
 });

 return (
  <div
   ref={(node) => {
    if (node) {
     dragRef(dropRef(node));
    }
   }}
   className="cursor-grab w-[300px] h-[300px] p-4 m-4 font-bold text-white rounded-lg  flex items-center justify-center shadow-md"
   style={{
    background: backgroundColor,
   }}
  >
   {item}
  </div>
 );
};

export default DraggableItem;
