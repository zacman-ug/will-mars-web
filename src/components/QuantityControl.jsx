import { Heart, Minus, Plus } from 'lucide-react';

export function QuantityControl({ value, onChange, min = 1, max = 20 }) {
  return (
    <div className="inline-flex items-center border border-white/15 rounded-full overflow-hidden">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="px-3 py-2 hover:bg-white/10"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-sm font-bold">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="px-3 py-2 hover:bg-white/10"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export function FavoriteButton({ active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? 'Remove from favourites' : 'Add to favourites'}
      className={`p-2 rounded-full border transition-colors ${
        active ? 'border-brand-amber text-brand-amber bg-brand-amber/10' : 'border-white/10 text-zinc-400 hover:text-white'
      }`}
    >
      <Heart size={16} fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}
