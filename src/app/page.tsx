"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ROUTES = [
 {
  title: "React-Dnd",
  href: "/react-dnd",
 },
 {
  title: "Dnd-Kit",
  href: "/dnd-kit",
 },
 {
  title: "React draggable",
  href: "/react-draggable",
 },
 {
  title: "Conclusion",
  href: "/conclusion",
 },
];

export default function Home() {
 const router = useRouter();
 return (
  <div className="min-h-screen flex flex-col  ">
   <main className="flex-grow flex items-center justify-center">
    <motion.div
     initial={{ opacity: 0, scale: 0.5 }}
     animate={{ opacity: 1, scale: 1 }}
     transition={{ duration: 0.5 }}
     className=""
    >
     <div className="grid grid-cols-2 gap-5">
      {ROUTES.map((item, index) => (
       <motion.div
        key={item.href}
        initial={{ opacity: 0, x: -50 }}
        onClick={() => router.push(item.href)}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-40 h-40 cursor-pointer flex bg-white p-8 rounded-lg shadow-lg  items-center justify-center"
       >
        <Link
         href={item.href}
         className="block text-lg font-bold text-black hover:text-blue-700 transition-colors duration-300"
        >
         {item.title}
        </Link>
       </motion.div>
      ))}
     </div>
    </motion.div>
   </main>
  </div>
 );
}
