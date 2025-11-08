export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export const rarityColors: Record<Rarity, { border: string; glow: string; bg: string; text: string }> = {
  common: {
    border: 'border-slate-500',
    glow: 'shadow-[0_0_20px_rgba(148,163,184,0.3)]',
    bg: 'from-slate-700 to-slate-800',
    text: 'text-slate-300',
  },
  rare: {
    border: 'border-blue-500',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    bg: 'from-blue-700 to-blue-900',
    text: 'text-blue-300',
  },
  epic: {
    border: 'border-purple-500',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
    bg: 'from-purple-700 to-purple-900',
    text: 'text-purple-300',
  },
  legendary: {
    border: 'border-yellow-500',
    glow: 'shadow-[0_0_30px_rgba(234,179,8,0.6)]',
    bg: 'from-yellow-600 to-orange-700',
    text: 'text-yellow-300',
  },
};