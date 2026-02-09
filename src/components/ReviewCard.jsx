import { Star } from 'lucide-react';

export const ReviewCard = ({ name, text, rating = 5 }) => (
  <div className="p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
    <div className="flex gap-1 mb-4 text-brand-amber">
      {[...Array(rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
    </div>
    <p className="italic text-zinc-300 mb-4">"{text}"</p>
    <p className="font-bold text-sm uppercase tracking-tighter">— {name}</p>
  </div>
);