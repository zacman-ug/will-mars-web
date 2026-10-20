import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { formatUGX, extraPriceLabel } from '../utils/format';
import { getCategory, getItemById, lineBreakdown, MENU_ITEMS } from '../constants/data';
import { buildCartLine, useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { FavoriteButton, QuantityControl } from '../components/QuantityControl';
import { MenuItemCard } from '../components/MenuItemCard';
import { MenuImage } from '../components/MenuImage';

export default function MenuItemPage() {
  const { id } = useParams();
  return <MenuItemEditor key={id} id={id} />;
}

function MenuItemEditor({ id }) {
  const item = getItemById(id);
  const { addLine } = useCart();
  const { has, toggle } = useFavorites();

  const defaults = useMemo(() => {
    const selected = {};
    item?.options?.forEach((group) => {
      if (group.choices?.[0]) selected[group.id] = group.choices[0].id;
    });
    return selected;
  }, [item]);

  const [selectedOptions, setSelectedOptions] = useState(defaults);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!item) return <Navigate to="/menu" replace />;

  const category = getCategory(item.category);
  const { parts, unit } = lineBreakdown(item, selectedOptions, selectedExtras);
  const total = unit * qty;
  const related = MENU_ITEMS.filter((other) => other.category === item.category && other.id !== item.id).slice(0, 3);

  const addToOrder = () => {
    addLine(buildCartLine(item, qty, selectedOptions, selectedExtras));
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const toggleExtra = (extraId) => {
    setSelectedExtras((prev) => (prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <p className="text-xs uppercase tracking-widest text-zinc-500 mb-6">
        <Link to="/menu" className="hover:text-brand-amber">Menu</Link>
        {' / '}
        <Link to={`/menu?cat=${item.category}`} className="hover:text-brand-amber">{category?.name}</Link>
        {' / '}
        <span className="text-zinc-300">{item.name}</span>
      </p>

      <div className="grid lg:grid-cols-2 gap-12">
        <MenuImage src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-3xl border border-white/10" width={800} height={800} priority />
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-brand-gold text-xs uppercase tracking-widest">{item.subcategory}</p>
              <h1 className="font-serif italic text-5xl mt-2">{item.name}</h1>
            </div>
            <FavoriteButton active={has(item.id)} onClick={() => toggle(item.id)} />
          </div>
          <p className="text-zinc-400 mt-4 leading-relaxed">{item.desc}</p>
          <p className="text-zinc-500 text-sm mt-3">
            Starting at <span className="text-brand-amber font-mono font-bold">{formatUGX(item.price)}</span>
          </p>

          <div className="mt-8 space-y-8">
            {item.options?.map((group) => (
              <fieldset key={group.id}>
                <legend className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-3">
                  {group.label} {group.required && <span className="text-brand-amber">*</span>}
                </legend>
                <div className="space-y-2">
                  {group.choices.map((choice) => (
                    <label
                      key={choice.id}
                      className={`flex justify-between items-center gap-4 border rounded-xl px-4 py-3 cursor-pointer ${
                        selectedOptions[group.id] === choice.id ? 'border-brand-amber bg-brand-amber/10' : 'border-white/10'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={`${item.id}-${group.id}`}
                          checked={selectedOptions[group.id] === choice.id}
                          onChange={() => setSelectedOptions((prev) => ({ ...prev, [group.id]: choice.id }))}
                        />
                        {choice.name}
                      </span>
                      <span className={`text-sm font-mono shrink-0 ${choice.price ? 'text-brand-amber' : 'text-zinc-500'}`}>
                        {extraPriceLabel(choice.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}

            {item.extras?.length > 0 && (
              <fieldset>
                <legend className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-3">
                  Additional items
                </legend>
                <p className="text-xs text-zinc-500 mb-3">Tick any extras. Each price is added on top of the dish.</p>
                <div className="space-y-2">
                  {item.extras.map((extra) => (
                    <label
                      key={extra.id}
                      className={`flex justify-between items-center gap-4 border rounded-xl px-4 py-3 cursor-pointer ${
                        selectedExtras.includes(extra.id) ? 'border-brand-amber bg-brand-amber/10' : 'border-white/10'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedExtras.includes(extra.id)}
                          onChange={() => toggleExtra(extra.id)}
                        />
                        {extra.name}
                      </span>
                      <span className="text-sm font-mono text-brand-amber shrink-0">+ {formatUGX(extra.price)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-900/50 p-5 space-y-2 text-sm">
            {parts.map((part, index) => (
              <div key={`${part.label}-${index}`} className="flex justify-between gap-4 text-zinc-400">
                <span>{part.label}</span>
                <span className="font-mono text-zinc-200">
                  {index === 0 ? formatUGX(part.amount) : extraPriceLabel(part.amount)}
                </span>
              </div>
            ))}
            {qty > 1 && (
              <div className="flex justify-between text-zinc-400">
                <span>Quantity</span>
                <span className="font-mono text-zinc-200">× {qty}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-white pt-2 border-t border-white/10">
              <span>Total</span>
              <span className="font-mono text-brand-amber">{formatUGX(total)}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <QuantityControl value={qty} onChange={setQty} />
            <button
              type="button"
              onClick={addToOrder}
              className="flex-1 min-w-[200px] bg-brand-amber text-zinc-950 font-bold py-3 rounded-full hover:bg-brand-gold"
            >
              {added ? 'Added to order' : `Add to order · ${formatUGX(total)}`}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif italic text-3xl mb-8">You might also like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((other) => (
              <MenuItemCard key={other.id} item={other} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
