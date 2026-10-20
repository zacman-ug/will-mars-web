import { Star } from 'lucide-react';

export const ReviewCard = ({ name, text, rating = 5 }) => (
  <div className="p-8 bg-zinc-900/50 rounded-2xl border border-white/5 h-full">
    <div className="flex gap-1 mb-4 text-brand-amber">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < rating ? 'currentColor' : 'none'} className={i < rating ? '' : 'text-zinc-700'} />
      ))}
    </div>
    <p className="italic text-zinc-300 mb-4">"{text}"</p>
    <p className="font-bold text-sm uppercase tracking-tighter">— {name}</p>
  </div>
);
