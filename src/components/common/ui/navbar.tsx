"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Gamepad } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "Home", href: "/home" },
  { label: "Quests", href: "/questPath" },
  { label: "Profile", href: "/profile" },
];

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-b border-white/20 dark:border-gray-700 shadow-md px-8 py-4 flex justify-between items-center">
    
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/home")}
      >
        <Gamepad size={28} className="text-white" />
        <span className="font-bold text-xl text-black dark:text-white">
          SkillQuest
        </span>
      </div>

      <div className="flex gap-8">
        {links.map((link) => (
          <motion.div
            key={link.href}
            whileHover={{ scale: 1.1, y: -2 }}
            className="cursor-pointer text-black dark:text-white font-medium relative"
            onClick={() => router.push(link.href)}
          >
            {link.label}
            <motion.div
              layoutId="underline"
              className="absolute left-0 bottom-0 h-1 bg-purple-500 rounded-full"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
        ))}
      </div>
    </nav>
  );
};