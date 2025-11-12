"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Gamepad, Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "Home", href: "/home" },
  { label: "Quests", href: "/questPath" },
  { label: "Profile", href: "/profile" },
  { label: "Achievements", href: "/achievements" },
];

export const Navbar: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (href: string) => {
    router.push(href);
    setMenuOpen(false);
  }

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

      <div className="hidden md:flex gap-8">
        {links.map((link) => (
          <motion.div
            key={link.href}
            whileHover={{ scale: 1.1, y: -2 }}
            className="cursor-pointer text-black dark:text-white font-medium relative"
            onClick={() => handleNavigation(link.href)}
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

      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="text-white focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-[70px] left-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-300 dark:border-gray-700 flex flex-col items-center py-6 space-y-4 md:hidden"
          >
            {links.map((link) => (
              <motion.button
                key={link.href}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNavigation(link.href)}
                className="text-lg font-medium text-gray-900 dark:text-white hover:text-purple-500 transition"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};