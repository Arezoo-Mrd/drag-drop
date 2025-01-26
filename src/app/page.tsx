"use client";

import dynamic from "next/dynamic";
const DrawingBoard = dynamic(() => import("./components/DrawingBoard"), {
 ssr: false,
});

export default function Home() {
 return (
  <div className="min-h-screen flex flex-col  ">
   <main className="flex-col flex items-center justify-center">
    <>
     <h1 className="text-4xl text-center font-bold   my-8 mt-10">
      Shape Drawing Tool
     </h1>
     <DrawingBoard />
    </>
   </main>
  </div>
 );
}
