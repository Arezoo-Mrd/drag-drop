"use client";

export default function ConclusionPage() {
 return (
  <div className="w-full flex items-center justify-center h-full" dir="rtl">
   <div className=" w-3/4 items-center justify-items-center text-slate-100 text-lg min-h-screen p-8  ">
    <h3 className="w-full text-start pb-2 font-bold text-2xl">
     {" "}
     پیشنهاد من برای انتخاب یک لایبرری خوب برای drag-drop با وجود کمی پیچیدگی در
     استفاده از این لایبرری، استفاده از dnd-kit هست چرا که:
    </h3>
    <ul className="w-full list-disc flex flex-col items-start pb-7">
     <li>
      مدیریت Sortable lists، DragOverlay، و قابلیت درگ آزادانه (مانند Mirror) با
      کمترین پیچیدگی.
     </li>
     <li>انیمیشن‌های بسیار روان و پشتیبانی از انیمیشن‌های دلخواه.</li>
     <li>پشتیبانی از TypeScript به صورت پیش‌فرض.</li>
     <li>کاملاً مستقل از DOM و قابل استفاده در هر محیطی.</li>
     <li>با React 18 و 19 کاملاً سازگار است.</li>
    </ul>
    <h3 className="w-full text-start pb-2 font-bold text-2xl">
     با این وجود انتخاب دوم من react-dnd است که مزایا و معایب زیر را دارد.
    </h3>
    <ul className="w-full list-disc flex flex-col items-start pb-7">
     مزایا:
     <li>پرفورمنس خوب</li>
     <li>
      مدیریت درگ و دراپ پیچیده مانند nested drag-and-drop یا multi-source drag
     </li>
     <li>
      انعطاف‌پذیری بالا برای مدیریت سناریوهای خاص (مثلاً drag previews یا custom
      drag layers)
     </li>
     <li>اکوسیستم بزرگ و داکیومنت خوب.</li>
     معایب:
     <li>استفاده از HOC‌ها (Higher-Order Components) و پیچیدگی‌های مرتبط.</li>
     <li>
      برای سناریوهای ساده، استفاده از این کتابخانه ممکن است بیش از حد پیچیده
      باشد.
     </li>
     <li>پشتیبانی متوسط از TypeScript</li>
    </ul>
   </div>
  </div>
 );
}
