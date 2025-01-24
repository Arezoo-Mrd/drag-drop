"use client";

export default function DndKit() {
 return (
  <div className="w-full flex items-center justify-center h-full" dir="rtl">
   <div className=" w-3/4 items-center justify-items-center text-slate-100 text-lg min-h-screen p-8  ">
    <h3 className="w-full text-start pb-2">
     {" "}
     پیشنهاد من برای انتخاب یک لایبرری خوب برای drag-dtop استفاده از dnd-kit هست
     چرا که:
    </h3>
    <ul className="w-full list-disc flex flex-col items-start">
     <li>
      مدیریت Sortable lists، DragOverlay، و قابلیت درگ آزادانه (مانند Mirror) با
      کمترین پیچیدگی.
     </li>
     <li>انیمیشن‌های بسیار روان و پشتیبانی از انیمیشن‌های دلخواه.</li>
     <li>پشتیبانی از TypeScript به صورت پیش‌فرض.</li>
     <li>کاملاً مستقل از DOM و قابل استفاده در هر محیطی.</li>
     <li>با React 18 و 19 کاملاً سازگار است.</li>
    </ul>
   </div>
  </div>
 );
}
