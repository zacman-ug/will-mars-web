import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BAKERY_ITEMS } from '../constants/bakery';
import { api } from '../lib/api';
import { formatUGX } from '../utils/format';
import { MenuImage } from '../components/MenuImage';

export default function BakeryPage() {
  const [items, setItems] = useState(BAKERY_ITEMS);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    api
      .bakery()
      .then((data) => {
        if (active && data.items?.length) setItems(data.items);
      })
      .catch((err) => {
        if (active) setError(err.message || 'Showing the counter list.');
      });
    return () => {
      active = false;
    };
  }, []);

  const groups = items.reduce((acc, item) => {
    const key = item.category || 'Bakery';
    if (!acc.find((group) => group.title === key)) acc.push({ title: key, items: [] });
    acc.find((group) => group.title === key).items.push(item);
    return acc;
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="text-[11px] tracking-[0.28em] text-zinc-500">Bakery</p>
      <h1 className="font-serif text-4xl md:text-6xl mt-3 font-normal">Order the cake before the day.</h1>
      <p className="mt-5 max-w-xl text-zinc-500 leading-7 font-light">
        Celebration cakes, trays for the morning meeting, a loaf to take home. You pick the date; the counter keeps the slot.
      </p>
      {error && <p className="text-sm text-brand-amber mt-4">{error}</p>}

      {groups.map((group) => (
        <section key={group.title} className="mt-16">
          <h2 className="font-serif text-2xl mb-8">{group.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {group.items.map((item) => (
              <Link key={item.slug} to={`/bakery/${item.slug}`} className="group grid grid-cols-[140px_1fr] gap-5">
                <MenuImage
                  src={item.image}
                  alt={item.name}
                  className="w-full h-36 object-cover rounded-2xl"
                  width={280}
                  height={220}
                />
                <div>
                  <h3 className="font-serif text-2xl text-zinc-50 group-hover:text-brand-amber">{item.name}</h3>
                  <p className="text-sm text-zinc-500 mt-2 font-light leading-6">{item.summary}</p>
                  <p className="text-sm text-zinc-300 mt-3">
                    from {formatUGX(item.basePrice)}
                    <span className="text-zinc-600"> · {item.leadHours}h notice</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
