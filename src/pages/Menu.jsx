import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS, groupBySubcategory } from '../constants/data';
import { MenuItemCard } from '../components/MenuItemCard';
import { useFavorites } from '../context/FavoritesContext';

export default function MenuPage() {
  const [params, setParams] = useSearchParams();
  const active = params.get('cat') || 'breakfast';
  const [query, setQuery] = useState('');
  const [favOnly, setFavOnly] = useState(false);
  const { ids } = useFavorites();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (favOnly && !ids.includes(item.id)) return false;
      if (q) {
        const hay = `${item.name} ${item.desc} ${item.subcategory}`.toLowerCase();
        return hay.includes(q);
      }
      if (favOnly) return true;
      return item.category === active;
    });
  }, [active, query, favOnly, ids]);

  const groups = groupBySubcategory(filtered);
  const category = CATEGORIES.find((cat) => cat.id === active);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="max-w-3xl mb-10">
        <p className="text-brand-gold text-xs uppercase tracking-[0.4em] font-bold">Menu</p>
        <h1 className="font-serif italic text-5xl mt-3">Welcome to Will-mar’s</h1>
        <p className="text-zinc-400 mt-4">
          Breakfast through luwombo, cocktails through cold beer — browse a category, open a dish, customize it, and add it to your order.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search katogo, luwombo, mojito…"
            className="w-full bg-zinc-900 border border-white/10 rounded-full pl-11 pr-4 py-3"
          />
        </div>
        <button
          type="button"
          onClick={() => setFavOnly((v) => !v)}
          className={`px-5 py-3 rounded-full text-xs uppercase tracking-widest font-bold border ${
            favOnly ? 'bg-brand-amber text-zinc-950 border-brand-amber' : 'border-white/10'
          }`}
        >
          Favourites
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 sticky top-20 z-30 bg-zinc-950/95 py-3 -mx-6 px-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setQuery('');
              setParams({ cat: cat.id });
            }}
            className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold border ${
              active === cat.id && !query
                ? 'bg-brand-amber text-zinc-950 border-brand-amber'
                : 'border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {!query && category && (
        <div className="mb-8 mt-4">
          <h2 className="text-3xl font-serif italic">{category.name}</h2>
          <p className="text-zinc-500">{category.blurb}</p>
        </div>
      )}

      {groups.length === 0 ? (
        <p className="text-zinc-500 py-20 text-center">No dishes match that search.</p>
      ) : (
        groups.map((group) => (
          <section key={group.title} className="mb-14">
            <h3 className="text-sm uppercase tracking-[0.3em] text-brand-gold font-bold border-b border-white/10 pb-3 mb-6">
              {group.title}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
