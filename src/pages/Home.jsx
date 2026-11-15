import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, MENU_ITEMS, REVIEWS, SITE } from '../constants/data';
import { MenuImage } from '../components/MenuImage';
import { formatUGX } from '../utils/format';

const FEATURED_IDS = ['md-01', 'lf-05', 'ck-01'];
const FOOD_CATS = CATEGORIES.filter((c) =>
  ['breakfast', 'localFood', 'mainDishes', 'quickBites', 'snacks', 'kidsMeals'].includes(c.id)
);
const DRINK_CATS = CATEGORIES.filter((c) => ['cocktails', 'beer', 'wine', 'beverages', 'desserts', 'sides'].includes(c.id));

export default function Home() {
  const featured = FEATURED_IDS.map((id) => MENU_ITEMS.find((item) => item.id === id)).filter(Boolean);
  const quote = REVIEWS[0];

  return (
    <div className="text-zinc-300">
      <section className="relative min-h-[100svh] flex items-end">
        <div className="absolute inset-0">
          <MenuImage
            src="/images/site/hero.webp"
            alt=""
            className="w-full h-full object-cover"
            width={1400}
            height={900}
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(9,9,11,0.92)_0%,rgba(9,9,11,0.45)_42%,rgba(9,9,11,0.28)_100%)]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 pt-40 md:pb-24">
          <p className="text-[11px] tracking-[0.28em] text-zinc-400 font-medium">Makamba Road · Kampala</p>
          <h1 className="mt-5 max-w-xl font-serif font-normal text-[2.75rem] leading-[1.12] text-zinc-50 md:text-6xl md:leading-[1.08]">
            A late table,
            <br />
            <em className="italic font-normal text-zinc-200">properly kept.</em>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-zinc-400 font-light">
            Kitchen and bar. Luwombo, cold lager, and the last round when the street is quiet.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              to="/menu"
              className="inline-flex items-center border border-[#c4a35a]/70 text-[#e8dcc8] px-7 py-2.5 text-[11px] tracking-[0.18em] hover:bg-[#c4a35a] hover:text-zinc-950 transition-colors"
            >
              The menu
            </Link>
            <Link to="/stays" className="text-[13px] text-zinc-400 hover:text-zinc-100 underline underline-offset-8 decoration-zinc-600">
              Book a room
            </Link>
            <Link to="/bakery" className="text-[13px] text-zinc-400 hover:text-zinc-100 underline underline-offset-8 decoration-zinc-600">
              The bakery
            </Link>
          </div>
        </div>
      </section>

      <p className="px-6 py-8 text-center text-[12px] tracking-[0.14em] text-zinc-500 font-light">
        Happy hour 5–8 daily<span className="mx-3 text-[#c4a35a]/50">·</span>
        Saturday from 8<span className="mx-3 text-[#c4a35a]/50">·</span>
        Sunday brunch from 10
      </p>
      <div className="home-hairline mx-auto max-w-xs" />

      <section className="px-6 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif text-3xl md:text-4xl font-normal leading-snug text-zinc-100">
            Come for katogo. Stay for a Will-mar Special after five.
          </p>
          <p className="mt-8 text-[15px] leading-8 text-zinc-500 font-light">
            We cook local stews the way they should be cooked, keep the bar honest, and leave enough room in the room
            for a conversation. Makamba Road has always known where to go.
          </p>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-4 md:gap-5">
          {featured[0] && (
            <FeaturedPlate item={featured[0]} className="md:col-span-7 md:row-span-2 min-h-[420px] md:min-h-[560px]" />
          )}
          {featured[1] && <FeaturedPlate item={featured[1]} className="md:col-span-5 min-h-[260px]" />}
          {featured[2] && <FeaturedPlate item={featured[2]} className="md:col-span-5 min-h-[260px]" />}
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-zinc-50">From the kitchen &amp; bar</h2>
            <Link to="/menu" className="text-[13px] text-zinc-500 hover:text-[#c4a35a] underline underline-offset-8 decoration-zinc-700">
              Full menu
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
            <MenuColumn title="To eat" items={FOOD_CATS} />
            <MenuColumn title="To drink" items={DRINK_CATS} />
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="md:grid md:grid-cols-2 md:min-h-[520px]">
          <div className="relative min-h-[320px] md:min-h-full">
            <MenuImage
              src="/images/site/interior.webp"
              alt="The dining room"
              className="absolute inset-0 w-full h-full object-cover"
              width={1200}
              height={800}
            />
          </div>
          <div className="flex items-center bg-[#111113] px-8 py-16 md:px-16">
            <div className="max-w-md">
              <h2 className="font-serif text-3xl md:text-[2.5rem] font-normal leading-snug text-zinc-50">
                On Makamba Road, the evening still belongs to the table.
              </h2>
              <p className="mt-6 text-[15px] leading-8 text-zinc-500 font-light">
                Happy hour is a habit. Saturday is louder. Sunday is the spread. None of it is dressed up more than it
                needs to be — which is why people come back.
              </p>
              <Link to="/about" className="inline-block mt-10 text-[13px] text-[#c4a35a] hover:text-[#e8dcc8] underline underline-offset-8">
                The house
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <blockquote className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl font-normal italic leading-relaxed text-zinc-200">
            “{quote.text}”
          </p>
          <footer className="mt-8 text-[12px] tracking-[0.16em] text-zinc-500">{quote.name}</footer>
        </blockquote>
      </section>

      <div className="home-hairline mx-auto max-w-xs" />

      <section className="px-6 py-24 md:py-28">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <Link to="/stays" className="group block">
            <p className="text-[11px] tracking-[0.2em] text-zinc-500 mb-4">Stay</p>
            <h2 className="font-serif text-3xl text-zinc-50 group-hover:text-[#c4a35a] transition-colors">Rooms above the house</h2>
            <p className="mt-4 text-[15px] leading-8 text-zinc-500 font-light">
              Four rooms, booked by the night. Come down for katogo. Sleep above the last round.
            </p>
            <span className="inline-block mt-6 text-[13px] text-zinc-400 underline underline-offset-8">See dates</span>
          </Link>
          <Link to="/bakery" className="group block">
            <p className="text-[11px] tracking-[0.2em] text-zinc-500 mb-4">Bakery</p>
            <h2 className="font-serif text-3xl text-zinc-50 group-hover:text-[#c4a35a] transition-colors">Cakes and morning trays</h2>
            <p className="mt-4 text-[15px] leading-8 text-zinc-500 font-light">
              Order the cake before the day. The counter keeps the slot; you collect, or we send it out.
            </p>
            <span className="inline-block mt-6 text-[13px] text-zinc-400 underline underline-offset-8">Book an order</span>
          </Link>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-zinc-500 mb-3">Visit</p>
            <p className="text-zinc-200 leading-7">
              {SITE.address}
              <br />
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#c4a35a] text-sm">
                Directions
              </a>
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.2em] text-zinc-500 mb-3">Hours</p>
            <ul className="space-y-1.5 text-[15px] text-zinc-300 font-light">
              {SITE.hours.map((row) => (
                <li key={row.label}>
                  <span className="text-zinc-500">{row.label}</span>
                  <br />
                  {row.value}
                </li>
              ))}
            </ul>
          </div>
          <Newsletter />
        </div>
      </section>
    </div>
  );
}

function FeaturedPlate({ item, className = '' }) {
  return (
    <Link to={`/menu/${item.id}`} className={`group relative overflow-hidden block ${className}`}>
      <MenuImage
        src={item.image}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        width={800}
        height={800}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p className="font-serif text-2xl text-zinc-50">{item.name}</p>
        <p className="mt-1 text-sm text-zinc-400 font-light">
          {item.desc} · {formatUGX(item.price)}
        </p>
      </div>
    </Link>
  );
}

function MenuColumn({ title, items }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.22em] text-zinc-500 mb-6">{title}</p>
      <ul className="divide-y divide-white/[0.06]">
        {items.map((cat) => (
          <li key={cat.id}>
            <Link to={`/menu?cat=${cat.id}`} className="flex justify-between items-baseline gap-6 py-3.5 group">
              <span className="text-zinc-200 group-hover:text-[#c4a35a] transition-colors">{cat.name}</span>
              <span className="text-sm text-zinc-600 font-light text-right">{cat.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <div>
      <p className="text-[11px] tracking-[0.2em] text-zinc-500 mb-3">Evenings</p>
      <p className="text-sm text-zinc-500 font-light mb-5 leading-6">A note when the week is worth dressing for.</p>
      <form
        className="flex gap-3 border-b border-white/15 pb-2"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
          setEmail('');
        }}
      >
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 py-1"
        />
        <button type="submit" className="text-[11px] tracking-[0.16em] text-[#c4a35a] hover:text-[#e8dcc8]">
          Send
        </button>
      </form>
      {done && <p className="text-xs text-zinc-500 mt-3">Noted. See you on Makamba Road.</p>}
    </div>
  );
}
