import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { DateRangePicker } from '../components/DateRangePicker';
import { MenuImage } from '../components/MenuImage';
import { getStayBySlug, STAY_LISTINGS } from '../constants/stays';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { addDaysISO, formatLongDate, nightsBetween, todayISO } from '../utils/dates';
import { formatUGX, waLink } from '../utils/format';
import { SITE } from '../constants/data';

export default function StayListingPage() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const fallback = getStayBySlug(slug);
  const { customer } = useAuth();
  const [listing, setListing] = useState(fallback || null);
  const [blocked, setBlocked] = useState([]);
  const [checkIn, setCheckIn] = useState(params.get('checkIn') || todayISO());
  const [checkOut, setCheckOut] = useState(params.get('checkOut') || addDaysISO(todayISO(), 2));
  const [guests, setGuests] = useState(Number(params.get('guests') || 2));
  const [photo, setPhoto] = useState(0);
  const [form, setForm] = useState({
    guestName: '',
    guestPhone: '',
    guestEmail: '',
    note: '',
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);

  useEffect(() => {
    let active = true;
    api
      .stay(slug)
      .then((data) => {
        if (active && data.listing) setListing(data.listing);
      })
      .catch(() => {
        if (active) setListing(fallback || null);
      });
    return () => {
      active = false;
    };
  }, [slug, fallback]);

  useEffect(() => {
    if (!customer) return undefined;
    const timer = setTimeout(() => {
      setForm((prev) => ({
        ...prev,
        guestName: prev.guestName || `${customer.firstName} ${customer.lastName}`.trim(),
        guestPhone: prev.guestPhone || customer.phone || '',
        guestEmail: prev.guestEmail || customer.email || '',
      }));
    }, 0);
    return () => clearTimeout(timer);
  }, [customer]);

  useEffect(() => {
    if (!slug) return undefined;
    let active = true;
    const from = todayISO();
    const to = addDaysISO(from, 120);
    api
      .stayAvailability(slug, from, to)
      .then((data) => {
        if (active) setBlocked(data.blocked || []);
      })
      .catch(() => {
        if (active) setBlocked([]);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  const nights = nightsBetween(checkIn, checkOut);
  const total = listing ? listing.nightlyRate * Math.max(nights, 0) + listing.cleaningFee : 0;

  const related = useMemo(
    () => STAY_LISTINGS.filter((other) => other.slug !== slug).slice(0, 3),
    [slug]
  );

  if (!listing && fallback === undefined) return <Navigate to="/stays" replace />;
  if (!listing) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-zinc-500">Looking up the room…</div>
    );
  }

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (nights < 1) {
      setError('Choose a check-out after check-in.');
      return;
    }
    setBusy(true);
    const payload = {
      slug: listing.slug,
      checkIn,
      checkOut,
      guests,
      guestName: form.guestName,
      guestPhone: form.guestPhone,
      guestEmail: form.guestEmail,
      note: form.note,
    };
    let bookingId = 'pending';
    let sendWhatsApp = false;
    try {
      const data = await api.bookStay(payload);
      bookingId = data.booking?.id || bookingId;
      setDone(data.booking);
      sendWhatsApp = true;
    } catch (err) {
      const messageText = err.message || 'Could not save the stay.';
      setError(messageText);
      sendWhatsApp = /cannot reach the server/i.test(messageText);
    }

    if (!sendWhatsApp) {
      setBusy(false);
      return;
    }

    const message = `Hello ${SITE.name}! Stay booking.

Room: ${listing.title}
Check-in: ${checkIn}
Check-out: ${checkOut}
Nights: ${nights}
Guests: ${guests}
Name: ${form.guestName}
Phone: ${form.guestPhone}
${form.guestEmail ? `Email: ${form.guestEmail}` : ''}
Total: ${formatUGX(total)}
Ref: ${bookingId}
${form.note ? `Note: ${form.note}` : ''}`;
    window.open(waLink(SITE.phone, message), '_blank');
    setBusy(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-zinc-500 mb-6">
        <Link to="/stays" className="hover:text-brand-amber">
          Stays
        </Link>
        {' / '}
        <span className="text-zinc-300">{listing.title}</span>
      </p>

      <div className="grid md:grid-cols-5 gap-3 rounded-3xl overflow-hidden">
        <button type="button" className="md:col-span-3 aspect-[4/3] overflow-hidden" onClick={() => setPhoto(0)}>
          <MenuImage
            src={listing.images?.[photo] || listing.images?.[0]}
            alt={listing.title}
            className="w-full h-full object-cover"
            width={1200}
            height={900}
            priority
          />
        </button>
        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-3">
          {(listing.images || []).slice(1, 3).map((src, index) => (
            <button type="button" key={src} className="aspect-[4/3] overflow-hidden" onClick={() => setPhoto(index + 1)}>
              <MenuImage src={src} alt="" className="w-full h-full object-cover" width={600} height={450} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 mt-12">
        <div className="lg:col-span-3">
          <h1 className="font-serif text-4xl md:text-5xl font-normal">{listing.title}</h1>
          <p className="text-zinc-500 mt-3">
            {listing.maxGuests} guests · {listing.bedrooms} bedroom{listing.bedrooms === 1 ? '' : 's'} · {listing.beds} bed
            {listing.beds === 1 ? '' : 's'} · {listing.baths} bath
          </p>
          <p className="mt-6 text-zinc-400 leading-8 font-light">{listing.description}</p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-2 text-sm text-zinc-300">
            {(listing.amenities || []).map((item) => (
              <li key={item} className="border-l border-[#c4a35a]/40 pl-3 py-1">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-12 border border-white/10 rounded-3xl p-6">
            <DateRangePicker
              checkIn={checkIn}
              checkOut={checkOut}
              blocked={blocked}
              onChange={({ checkIn: nextIn, checkOut: nextOut }) => {
                setCheckIn(nextIn);
                setCheckOut(nextOut);
              }}
            />
          </div>
        </div>

        <aside className="lg:col-span-2">
          <form onSubmit={submit} className="sticky top-28 bg-zinc-900/60 border border-white/10 rounded-3xl p-6 space-y-4">
            <p className="font-serif text-3xl">
              {formatUGX(listing.nightlyRate)}
              <span className="text-base text-zinc-500 font-sans font-light"> / night</span>
            </p>
            <p className="text-sm text-zinc-500">
              {nights > 0
                ? `${formatLongDate(checkIn)} – ${formatLongDate(checkOut)}`
                : 'Select dates on the calendar'}
            </p>
            <label className="block text-xs text-zinc-500">
              Guests
              <select
                value={Math.min(guests, listing.maxGuests)}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="mt-1 w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-zinc-100"
              >
                {Array.from({ length: listing.maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <input
              required
              name="guestName"
              value={form.guestName}
              onChange={(e) => setForm((prev) => ({ ...prev, guestName: e.target.value }))}
              placeholder="Full name"
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3"
            />
            <input
              required
              name="guestPhone"
              value={form.guestPhone}
              onChange={(e) => setForm((prev) => ({ ...prev, guestPhone: e.target.value }))}
              placeholder="Phone"
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3"
            />
            <input
              type="email"
              name="guestEmail"
              value={form.guestEmail}
              onChange={(e) => setForm((prev) => ({ ...prev, guestEmail: e.target.value }))}
              placeholder="Email (optional)"
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3"
            />
            <textarea
              name="note"
              value={form.note}
              onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
              placeholder="Arrival time or requests"
              rows={3}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3"
            />
            {nights > 0 && (
              <ul className="text-sm text-zinc-400 space-y-1 border-t border-white/10 pt-3">
                <li className="flex justify-between">
                  <span>
                    {formatUGX(listing.nightlyRate)} × {nights} night{nights === 1 ? '' : 's'}
                  </span>
                  <span>{formatUGX(listing.nightlyRate * nights)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Cleaning</span>
                  <span>{formatUGX(listing.cleaningFee)}</span>
                </li>
                <li className="flex justify-between text-zinc-100 font-medium pt-2">
                  <span>Total</span>
                  <span>{formatUGX(total)}</span>
                </li>
              </ul>
            )}
            {error && <p className="text-sm text-red-400">{error}</p>}
            {done && (
              <p className="text-sm text-brand-amber">
                Request saved{done.id && done.id !== 'local' ? ` · ${done.id.slice(-8)}` : ''}. Confirm on WhatsApp.
              </p>
            )}
            <button
              disabled={busy || nights < 1}
              className="w-full bg-brand-amber text-zinc-950 font-bold py-3 rounded-full disabled:opacity-40"
            >
              {busy ? 'Sending…' : 'Request to book'}
            </button>
            <p className="text-[11px] text-zinc-600 leading-5">
              We hold the dates as pending until the house confirms on WhatsApp. No card is taken here.
            </p>
          </form>
        </aside>
      </div>

      <div className="mt-20">
        <p className="text-[11px] tracking-[0.2em] text-zinc-500 mb-6">Other rooms</p>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((other) => (
            <Link key={other.slug} to={`/stays/${other.slug}`} className="group">
              <MenuImage
                src={other.images[0]}
                alt={other.title}
                className="w-full aspect-[4/3] object-cover rounded-2xl"
                width={600}
                height={450}
              />
              <p className="mt-3 font-serif text-xl group-hover:text-brand-amber">{other.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
