"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-5 py-1 text-gray-500 dark:text-gray-400 bg-gray-800 flex justify-center items-center gap-2 text-sm">
      <span>Made with</span>
      <Heart className="w-3 h-3 text-white" />
      <span>by</span>
      <Link
        href="https://www.instagram.com/ioana.chr9"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white !dark:text-blue-400 hover:underline cursor-pointer"
      >
       ioana
      </Link>
    </footer>
  );
};
