import { Link } from 'react-router-dom';
import { MenuImage } from './MenuImage';
import { formatUGX } from '../utils/format';
import { FavoriteButton } from './QuantityControl';
import { useFavorites } from '../context/FavoritesContext';

export function MenuItemCard({ item }) {
  const { has, toggle } = useFavorites();

  return (
    <article className="group bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-brand-gold/40 transition-colors flex flex-col">
      <Link to={`/menu/${item.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <MenuImage
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          width={800}
          height={600}
        />
        {item.popular && (
          <span className="absolute top-3 left-3 bg-brand-amber text-zinc-950 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
            Popular
          </span>
        )}
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/menu/${item.id}`} className="font-bold text-lg leading-tight hover:text-brand-amber">
            {item.name}
          </Link>
          <FavoriteButton active={has(item.id)} onClick={() => toggle(item.id)} />
        </div>
        <p className="text-sm text-zinc-500 line-clamp-2 flex-1">{item.desc}</p>
        {(item.options?.length > 0 || item.extras?.length > 0) && (
          <p className="text-[10px] uppercase tracking-widest text-zinc-600">Customize on the next screen</p>
        )}
        <div className="flex items-center justify-between pt-2">
          <span className="text-brand-amber font-mono font-bold">{formatUGX(item.price)}</span>
          <Link
            to={`/menu/${item.id}`}
            className="text-[10px] uppercase tracking-widest font-bold text-white bg-white/10 hover:bg-brand-amber hover:text-zinc-950 px-3 py-2 rounded-full transition-colors"
          >
            Order
          </Link>
        </div>
      </div>
    </article>
  );
}
