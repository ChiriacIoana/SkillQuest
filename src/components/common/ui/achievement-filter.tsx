"use client";

type Props = {
  filter: string;
  setFilter: (filter: string) => void;
};

export function AchievementFilters({ filter, setFilter }: Props) {
  return (
    <div className="flex gap-3 mb-6">
      {["all", "unlocked", "locked"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
            filter === f
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
