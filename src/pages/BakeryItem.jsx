import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { bakeryLineTotal, BAKERY_ITEMS, getBakeryBySlug } from '../constants/bakery';
import { SITE } from '../constants/data';
import { MenuImage } from '../components/MenuImage';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { addDaysISO, todayISO } from '../utils/dates';
import { extraPriceLabel, formatUGX, waLink } from '../utils/format';

export default function BakeryItemPage() {
  const { slug } = useParams();
  const fallback = getBakeryBySlug(slug);
  const { customer } = useAuth();
  const [item, setItem] = useState(fallback || null);
  const [sizeId, setSizeId] = useState(fallback?.sizes?.[0]?.id || '');
  const [flavourId, setFlavourId] = useState(fallback?.flavours?.[0]?.id || '');
  const [extraIds, setExtraIds] = useState([]);
  const [qty, setQty] = useState(1);
  const minDate = addDaysISO(todayISO(), fallback ? Math.ceil((fallback.leadHours || 24) / 24) : 1);
  const [pickupDate, setPickupDate] = useState(minDate);
  const [pickupTime, setPickupTime] = useState('10:00');
  const [fulfillment, setFulfillment] = useState('pickup');
  const [destination, setDestination] = useState('');
  const [form, setForm] = useState({ guestName: '', guestPhone: '', guestEmail: '', messageOnCake: '', note: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);

  useEffect(() => {
    let active = true;
    api
      .bakeryItem(slug)
      .then((data) => {
        if (!active || !data.item) return;
        setItem(data.item);
        setSizeId(data.item.sizes?.[0]?.id || '');
        setFlavourId(data.item.flavours?.[0]?.id || '');
        const leadDays = Math.ceil((data.item.leadHours || 24) / 24);
        setPickupDate(addDaysISO(todayISO(), leadDays));
      })
      .catch(() => {
        if (active) setItem(fallback || null);
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

  const priced = useMemo(
    () => (item ? bakeryLineTotal(item, sizeId, flavourId, extraIds, qty) : { unit: 0, total: 0, extras: [] }),
    [item, sizeId, flavourId, extraIds, qty]
  );

  if (!item && !fallback) return <Navigate to="/bakery" replace />;
  if (!item) return <div className="max-w-6xl mx-auto px-6 py-16 text-zinc-500">Looking at the counter…</div>;

  const toggleExtra = (id) => {
    setExtraIds((prev) => (prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    const payload = {
      slug: item.slug,
      pickupDate,
      pickupTime,
      fulfillment,
      destination,
      sizeId,
      flavourId,
      extraIds,
      qty,
      guestName: form.guestName,
      guestPhone: form.guestPhone,
      guestEmail: form.guestEmail,
      messageOnCake: form.messageOnCake,
      note: form.note,
    };
    let orderId = 'pending';
    let sendWhatsApp = false;
    try {
      const data = await api.bookBakery(payload);
      orderId = data.order?.id || orderId;
      setDone(data.order);
      sendWhatsApp = true;
    } catch (err) {
      const messageText = err.message || 'Could not save the bakery booking.';
      setError(messageText);
      sendWhatsApp = /cannot reach the server/i.test(messageText);
    }

    if (!sendWhatsApp) {
      setBusy(false);
      return;
    }

    const extrasLine = priced.extras.map((extra) => extra.name).join(', ');
    const message = `Hello ${SITE.name}! Bakery booking.

Item: ${item.name}
Qty: ${qty}
Size: ${priced.size?.name || '—'}
Flavour: ${priced.flavour?.name || '—'}
${extrasLine ? `Extras: ${extrasLine}` : ''}
${form.messageOnCake ? `Inscription: ${form.messageOnCake}` : ''}
When: ${pickupDate} ${pickupTime}
${fulfillment === 'delivery' ? `Delivery: ${destination}` : 'Collection at Will-mar’s'}
Name: ${form.guestName}
Phone: ${form.guestPhone}
Total: ${formatUGX(priced.total)}
Ref: ${orderId}
${form.note ? `Note: ${form.note}` : ''}`;
    window.open(waLink(SITE.phone, message), '_blank');
    setBusy(false);
  };

  const related = BAKERY_ITEMS.filter((other) => other.slug !== item.slug).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-zinc-500 mb-6">
        <Link to="/bakery" className="hover:text-brand-amber">
          Bakery
        </Link>
        {' / '}
        <span className="text-zinc-300">{item.name}</span>
      </p>

      <div className="grid lg:grid-cols-2 gap-12">
        <MenuImage
          src={item.image}
          alt={item.name}
          className="w-full aspect-square object-cover rounded-3xl"
          width={800}
          height={800}
          priority
        />
        <form onSubmit={submit} className="space-y-5">
          <p className="text-[11px] tracking-[0.2em] text-zinc-500">{item.category}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-normal">{item.name}</h1>
          <p className="text-zinc-400 leading-7 font-light">{item.description}</p>
          <p className="text-sm text-zinc-500">{item.leadHours} hours’ notice · from {formatUGX(item.basePrice)}</p>

          {item.sizes?.length > 0 && (
            <fieldset>
              <legend className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Size</legend>
              <div className="space-y-2">
                {item.sizes.map((size) => (
                  <label key={size.id} className="flex items-center justify-between gap-3 border border-white/10 rounded-xl px-4 py-3">
                    <span>
                      <input
                        type="radio"
                        name="size"
                        className="mr-3"
                        checked={sizeId === size.id}
                        onChange={() => setSizeId(size.id)}
                      />
                      {size.name}
                    </span>
                    <span className="text-sm text-zinc-500">{extraPriceLabel(size.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {item.flavours?.length > 0 && (
            <fieldset>
              <legend className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Flavour</legend>
              <div className="space-y-2">
                {item.flavours.map((flavour) => (
                  <label key={flavour.id} className="flex items-center justify-between gap-3 border border-white/10 rounded-xl px-4 py-3">
                    <span>
                      <input
                        type="radio"
                        name="flavour"
                        className="mr-3"
                        checked={flavourId === flavour.id}
                        onChange={() => setFlavourId(flavour.id)}
                      />
                      {flavour.name}
                    </span>
                    <span className="text-sm text-zinc-500">{extraPriceLabel(flavour.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {item.extras?.length > 0 && (
            <fieldset>
              <legend className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Extras</legend>
              <div className="space-y-2">
                {item.extras.map((extra) => (
                  <label key={extra.id} className="flex items-center justify-between gap-3 border border-white/10 rounded-xl px-4 py-3">
                    <span>
                      <input
                        type="checkbox"
                        className="mr-3"
                        checked={extraIds.includes(extra.id)}
                        onChange={() => toggleExtra(extra.id)}
                      />
                      {extra.name}
                    </span>
                    <span className="text-sm text-zinc-500">{extraPriceLabel(extra.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {extraIds.includes('inscription') && (
            <input
              required
              maxLength={80}
              value={form.messageOnCake}
              onChange={(e) => setForm((prev) => ({ ...prev, messageOnCake: e.target.value }))}
              placeholder="Inscription on the cake"
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3"
            />
          )}

          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs text-zinc-500">
              Date
              <input
                type="date"
                required
                min={minDate}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="mt-1 w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-zinc-100"
              />
            </label>
            <label className="text-xs text-zinc-500">
              Time
              <input
                type="time"
                required
                min="08:00"
                max="20:00"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="mt-1 w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-zinc-100"
              />
            </label>
          </div>

          <label className="text-xs text-zinc-500 block">
            Quantity
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="mt-1 w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-zinc-100"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <div className="flex gap-3 text-sm">
            {['pickup', 'delivery'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setFulfillment(mode)}
                className={`px-4 py-2 rounded-full border ${
                  fulfillment === mode ? 'border-brand-amber text-brand-amber' : 'border-white/10 text-zinc-400'
                }`}
              >
                {mode === 'pickup' ? 'Collect at Will-mar’s' : 'Deliver'}
              </button>
            ))}
          </div>
          {fulfillment === 'delivery' && (
            <input
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Delivery address or landmark"
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3"
            />
          )}

          <input
            required
            value={form.guestName}
            onChange={(e) => setForm((prev) => ({ ...prev, guestName: e.target.value }))}
            placeholder="Full name"
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3"
          />
          <input
            required
            value={form.guestPhone}
            onChange={(e) => setForm((prev) => ({ ...prev, guestPhone: e.target.value }))}
            placeholder="Phone"
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3"
          />
          <input
            type="email"
            value={form.guestEmail}
            onChange={(e) => setForm((prev) => ({ ...prev, guestEmail: e.target.value }))}
            placeholder="Email (optional)"
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3"
          />
          <textarea
            value={form.note}
            onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
            placeholder="Notes for the baker"
            rows={3}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3"
          />

          <p className="flex justify-between text-zinc-100">
            <span>Total</span>
            <span>{formatUGX(priced.total)}</span>
          </p>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {done && (
            <p className="text-sm text-brand-amber">
              Slot saved{done.id && done.id !== 'local' ? ` · ${done.id.slice(-8)}` : ''}. Confirm on WhatsApp.
            </p>
          )}
          <button disabled={busy} className="w-full bg-brand-amber text-zinc-950 font-bold py-3 rounded-full disabled:opacity-40">
            {busy ? 'Sending…' : 'Book this order'}
          </button>
        </form>
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-6">
        {related.map((other) => (
          <Link key={other.slug} to={`/bakery/${other.slug}`} className="group">
            <MenuImage src={other.image} alt={other.name} className="w-full h-40 object-cover rounded-2xl" width={400} height={240} />
            <p className="mt-3 font-serif text-xl group-hover:text-brand-amber">{other.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
