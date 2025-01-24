"use client";
// import React from "react";

// const DraggableContainer = () => {
//  return (
//   <h3
//    dir="rtl"
//    className="text-white p-5 leading-9 text-2xl font-bold text-center"
//   >
//    این لایبرری امکانات خوبی می‌دهد و UI بسیار شبیه Mirror دارد اما متاسفانه با
//    ورژن 19 ریکت سازگاری ندارد. با ورژن‌های ۱۸ سازگار است اما برای ورژن‌های
//    بالاتر باید منتظر آپدیت آن باشیم.
//   </h3>
//  );
// };

// export default DraggableContainer;

import React, { memo, useCallback, useState } from "react";

const Draggable = memo(function (props: {
 children: any;
 position: { x: number; y: number };
}) {
 const [dragging, setDragging] = useState<boolean>(false);

 const moveWidget = useCallback(
  (e: React.MouseEvent) => {
   if (dragging) {
    const top = e.currentTarget.parentElement!.getBoundingClientRect().top;
    e.currentTarget.parentElement!.style.top = top + e.movementY + "px";
    const left = e.currentTarget.parentElement!.getBoundingClientRect().left;
    e.currentTarget.parentElement!.style.left = left + e.movementX + "px";
   }
  },
  [dragging]
 );

 return (
  <div
   style={{
    position: "absolute",
    top: props.position.y,
    left: props.position.y,
   }}
  >
   <div
    className="handle"
    onMouseDown={() => setDragging(true)}
    onMouseUp={() => setDragging(false)}
    onMouseEnter={() => setDragging(false)}
    onMouseMove={moveWidget}
   ></div>
   {props.children}
  </div>
 );
});
