"use client";

import { useEffect, useState } from "react";
import { Lightbulb, MessageCircle, X, Loader2 } from "lucide-react";
import { set } from "zod";

interface HintCardProps {
  questionText: string;
  backendUrl: string;
  className?: string;
  onHintGenerated?: (hint: string) => void;
  onOpenChat?: () => void;
}

export default function HintCard({
  questionText,
  backendUrl,
  className = "",
  onHintGenerated,
  onOpenChat,
}: HintCardProps) {
  const [hint, setHint] = useState<string>("");
  const [displayedHint, setDisplayedHint] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!hint) return;

    setDisplayedHint("");
    let currentIndex = 0;

    const interval = setInterval(() => {
      const char = hint[currentIndex];
      if (char === undefined) {
        clearInterval(interval);
        return;
      }

      setDisplayedHint((prev) => prev + char);
      currentIndex++;
    }, 30);

    return () => clearInterval(interval);
  }, [hint]);

  const handleGetHint = async () => {
    setLoading(true);
    setShowHint(false);
    setError("");
    setHint("");
    setDisplayedHint("");

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${backendUrl}/hint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify({
          questionText,
        }),
      });
      //console.log("Backend URL:", backendUrl);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setHint(data.hint ?? "");
      setDisplayedHint("");
      setShowHint(true);

      if (onHintGenerated) {
        onHintGenerated(data.hint ?? "");
      }
    } catch (err) {
      console.error("Error fetching hint:", err);
      setError("Failed to fetch hint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowHint(false);
    setHint("");
    setDisplayedHint("");
    setError("");
  };

  return (
    <div className={className}>
      {!showHint && (
        <button
          onClick={handleGetHint}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-white to-gray-200 text-gray-800 rounded-lg hover:from-blue-200 hover:to-blue-400 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <Lightbulb className="w-5 h-5" />
          Get a Hint
        </button>
      )}

      {showHint && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 shadow-lg border border-blue-200 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageCircle className="w-5 h-5 text-blue-800" />
              </div>
              <h3 className="font-semibold text-gray-800">AI Tutor Hint</h3>
            </div>

            <button
              onClick={handleClose}
              className="p-1 hover:bg-blue-200 rounded-md transition-colors"
              aria-label="Close hint"
            >
              <X className="w-5 h-5 text-blue-800" />
            </button>
          </div>

          <div className="ml-11">
            {loading ? (
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Generating your hint...</span>
              </div>
            ) : error ? (
              <p className="text-red-600 text-sm">{error}</p>
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {displayedHint}
                <span className="animate-pulse">| </span>
              </p>
            )}
          </div>

          {!loading && !error && hint && (
            <div className="mt-4 pt-3 border-t border-blue-200">
              <p className="text-xs text-gray-600 italic flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5" />
                Use this hint to get some insight!
              </p>

              <button
                onClick={onOpenChat}
                className="text-xs px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Open AI Chat
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}