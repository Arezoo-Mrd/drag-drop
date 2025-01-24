import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id, color }: { id: string; color?: string }) => {
 const { attributes, listeners, setNodeRef, transform, transition } =
  useSortable({ id });

 const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  backgroundColor: color,
 };

 return (
  <div
   ref={setNodeRef}
   style={style}
   {...attributes}
   {...listeners}
   className={`text-white flex items-center justify-center font-bold text-2xl w-[300px] h-[300px] m-4  p-4 rounded shadow`}
  >
   {id}
  </div>
 );
};
