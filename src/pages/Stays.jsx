import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { STAY_LISTINGS } from '../constants/stays';
import { api } from '../lib/api';
import { addDaysISO, formatLongDate, nightsBetween, todayISO } from '../utils/dates';
import { formatUGX } from '../utils/format';
import { MenuImage } from '../components/MenuImage';

export default function StaysPage() {
  const [params, setParams] = useSearchParams();
  const [checkIn, setCheckIn] = useState(params.get('checkIn') || todayISO());
  const [checkOut, setCheckOut] = useState(params.get('checkOut') || addDaysISO(todayISO(), 2));
  const [guests, setGuests] = useState(Number(params.get('guests') || 2));
  const [listings, setListings] = useState(STAY_LISTINGS);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const nights = nightsBetween(checkIn, checkOut);

  useEffect(() => {
    let active = true;
    api
      .stays({ checkIn, checkOut, guests })
      .then((data) => {
        if (!active) return;
        setListings(data.listings?.length ? data.listings : []);
        setError('');
      })
      .catch((err) => {
        if (!active) return;
        setListings(
          STAY_LISTINGS.filter((listing) => listing.maxGuests >= guests)
        );
        setError(err.message || 'Showing rooms from the house list.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [checkIn, checkOut, guests]);

  const search = (event) => {
    event.preventDefault();
    setParams({ checkIn, checkOut, guests: String(guests) });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="text-[11px] tracking-[0.28em] text-zinc-500">Stay</p>
      <h1 className="font-serif text-4xl md:text-6xl mt-3 font-normal">Rooms above the house.</h1>
      <p className="mt-5 max-w-xl text-zinc-500 leading-7 font-light">
        Four rooms on Makamba Road. You book the dates, we keep the keys, and breakfast is downstairs if you want it.
      </p>

      <form
        onSubmit={search}
        className="mt-10 grid md:grid-cols-4 gap-3 bg-zinc-900/50 border border-white/10 rounded-2xl p-4"
      >
        <label className="text-xs text-zinc-500">
          Check-in
          <input
            type="date"
            required
            min={todayISO()}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (nightsBetween(e.target.value, checkOut) < 1) {
                setCheckOut(addDaysISO(e.target.value, 1));
              }
            }}
            className="mt-1 w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-zinc-100"
          />
        </label>
        <label className="text-xs text-zinc-500">
          Check-out
          <input
            type="date"
            required
            min={addDaysISO(checkIn, 1)}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-zinc-100"
          />
        </label>
        <label className="text-xs text-zinc-500">
          Guests
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-zinc-100"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="self-end bg-brand-amber text-zinc-950 font-bold py-2.5 rounded-xl">
          Search dates
        </button>
      </form>

      <p className="mt-6 text-sm text-zinc-500">
        {nights > 0 ? `${formatLongDate(checkIn)} – ${formatLongDate(checkOut)} · ${nights} night${nights === 1 ? '' : 's'}` : 'Choose dates'}
      </p>
      {error && <p className="text-sm text-brand-amber mt-2">{error}</p>}
      {loading && <p className="text-sm text-zinc-600 mt-4">Looking at the diary…</p>}

      <div className="mt-10 grid md:grid-cols-2 gap-8">
        {listings.map((listing) => (
          <Link
            key={listing.slug}
            to={`/stays/${listing.slug}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
            className="group block"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <MenuImage
                src={listing.images?.[0]}
                alt={listing.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                width={900}
                height={700}
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-zinc-50">{listing.title}</h2>
                <p className="text-sm text-zinc-500 mt-1 font-light">{listing.summary}</p>
                <p className="text-xs text-zinc-600 mt-2">
                  {listing.maxGuests} guests · {listing.bedrooms} bedroom{listing.bedrooms === 1 ? '' : 's'} · {listing.beds} bed{listing.beds === 1 ? '' : 's'}
                </p>
              </div>
              <p className="text-sm text-zinc-300 whitespace-nowrap">
                {formatUGX(listing.nightlyRate)}
                <span className="text-zinc-600"> / night</span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      {!loading && listings.length === 0 && (
        <p className="mt-12 text-zinc-500">Nothing free for those dates. Try another night, or a smaller party.</p>
      )}
    </div>
  );
}
