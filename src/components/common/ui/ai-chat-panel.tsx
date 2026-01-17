"use client";

import { X, Send } from "lucide-react";
import { useState } from "react";

interface AiChatPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function AiChatPanel({ open, onClose }: AiChatPanelProps) {
  const [message, setMessage] = useState("");

  return (
    <div
      className={`
        fixed z-50 bg-gray-100 shadow-2xl border-gray-300
        transition-all duration-300 ease-in-out

        top-0 right-0 h-full w-96 border-l rounded-l-lg
        ${open ? "translate-x-0" : "translate-x-full"}

        max-md:w-70

        max-sm:w-full max-sm:h-[85vh] max-sm:top-auto max-sm:bottom-0
        max-sm:rounded-t-2xl max-sm:rounded-l-none max-sm:border-l-0 max-sm:border-t
        max-sm:translate-x-0
        ${open ? "max-sm:translate-y-0" : "max-sm:translate-y-full"}
      `}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-gray-800">AI Tutor Chat</h3>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-blue-800" />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700">
        <p className="italic text-gray-500">
          Ask follow-up questions about the hint…
        </p>
      </div>

      <div className="p-4 border-t flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question…" 
          className="flex-1 px-3 py-2 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-md">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
