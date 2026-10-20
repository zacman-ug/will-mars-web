import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { SITE } from '../constants/data';
import { formatUGX, waLink } from '../utils/format';
import { QuantityControl } from './QuantityControl';
import { MenuImage } from './MenuImage';
import { api } from '../lib/api';

const FALLBACK_ZONES = [
  { id: 'fallback-makindye', slug: 'makindye', name: 'Makindye / Makamba Road', fee: 5000 },
  { id: 'fallback-kabalagala', slug: 'kabalagala', name: 'Kabalagala / Nsambya', fee: 6000 },
  { id: 'fallback-central', slug: 'central', name: 'Kampala Central', fee: 8000 },
  { id: 'fallback-nakasero', slug: 'nakasero', name: 'Nakasero / Kololo', fee: 10000 },
  { id: 'fallback-ntinda', slug: 'ntinda', name: 'Ntinda / Bukoto', fee: 12000 },
  { id: 'fallback-najjera', slug: 'najjera', name: 'Najjera / Kira', fee: 15000 },
  { id: 'fallback-entebbe-rd', slug: 'entebbe-rd', name: 'Entebbe Road / Kajjansi', fee: 18000 },
  { id: 'fallback-wakiso', slug: 'wakiso', name: 'Wakiso / Nansana', fee: 20000 },
];

export function CartDrawer() {
  const { lines, isOpen, setIsOpen, updateQty, removeLine, clearCart, subtotal } = useCart();
  const { customer } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [fulfillment, setFulfillment] = useState('dine-in');
  const [zones, setZones] = useState(FALLBACK_ZONES);
  const [zoneId, setZoneId] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    api
      .zones()
      .then((data) => {
        if (active && Array.isArray(data.zones) && data.zones.length) {
          setZones(data.zones);
        }
      })
      .catch(() => {
        if (active) setZones(FALLBACK_ZONES);
      });
    return () => {
      active = false;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!customer) return;
    setName((prev) => prev || `${customer.firstName} ${customer.lastName}`.trim());
    setPhone((prev) => prev || customer.phone || '');
  }, [customer]);

  const selectedZone = zones.find((zone) => zone.id === zoneId);
  const deliveryFee = fulfillment === 'delivery' && selectedZone ? selectedZone.fee : 0;
  const total = subtotal + deliveryFee;

  const placeOrder = async () => {
    setError('');
    if (!name.trim() || !phone.trim()) {
      setError('Add your name and phone so we can confirm the order.');
      return;
    }
    if (!lines.length) return;
    if (fulfillment === 'delivery') {
      if (!zoneId || !selectedZone) {
        setError('Choose the delivery destination so we can add the delivery fee.');
        return;
      }
      if (!destination.trim()) {
        setError('Add a street, estate, or landmark for the rider.');
        return;
      }
    }

    const payload = {
      guestName: name.trim().slice(0, 80),
      guestPhone: phone.trim().slice(0, 20),
      fulfillment,
      note: note.trim().slice(0, 500),
      destination: fulfillment === 'delivery' ? destination.trim().slice(0, 160) : undefined,
      deliveryZoneId: fulfillment === 'delivery' ? zoneId : undefined,
      items: lines.map((line) => ({
        name: line.name,
        qty: line.qty,
        unitPrice: line.unitPrice,
        optionLabels: line.optionLabels,
        extraLabels: line.extraLabels,
      })),
    };

    setBusy(true);
    let saved = null;
    try {
      saved = await api.saveOrder(payload);
    } catch (err) {
      setError(err.message || 'Could not save the order. You can still send it on WhatsApp.');
    } finally {
      setBusy(false);
    }

    const itemsText = lines
      .map((line) => {
        const extras = [...line.optionLabels, ...line.extraLabels].join(', ');
        return `• ${line.qty}x ${line.name} — ${formatUGX(line.unitPrice * line.qty)}${extras ? `\n  ${extras}` : ''}`;
      })
      .join('\n');

    const deliveryLines =
      fulfillment === 'delivery'
        ? `Destination: ${selectedZone.name}
Address: ${destination.trim()}
Delivery: ${formatUGX(deliveryFee)}`
        : '';

    const message = `Hello ${SITE.name}! I'd like to place an order.

Name: ${name.trim()}
Phone: ${phone.trim()}
Type: ${fulfillment}
${deliveryLines}
${note.trim() ? `Note: ${note.trim()}\n` : ''}
${itemsText}

Food: ${formatUGX(subtotal)}
${fulfillment === 'delivery' ? `Delivery: ${formatUGX(deliveryFee)}\n` : ''}Total: ${formatUGX(saved?.order?.total ?? total)}`;

    window.open(waLink(SITE.phone, message), '_blank');
    clearCart();
    setIsOpen(false);
    setZoneId('');
    setDestination('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button className="absolute inset-0 bg-black/70" aria-label="Close cart" onClick={() => setIsOpen(false)} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="font-serif italic text-2xl">Your order</h2>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close">
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {lines.length === 0 ? (
            <div className="text-center py-16 text-zinc-500">
              <ShoppingBag className="mx-auto mb-4" />
              <p>Your cart is empty.</p>
              <Link to="/menu" onClick={() => setIsOpen(false)} className="text-brand-amber font-bold uppercase text-xs tracking-widest mt-4 inline-block">
                Browse menu
              </Link>
            </div>
          ) : (
            lines.map((line) => (
              <div key={line.key} className="flex gap-3 border border-white/5 rounded-xl p-3">
                <MenuImage src={line.image} alt={line.name} className="w-16 h-16 rounded-lg object-cover" width={128} height={128} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2 items-start">
                    <p className="font-bold truncate">{line.name}</p>
                    <button
                      type="button"
                      onClick={() => removeLine(line.key)}
                      className="shrink-0 inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-zinc-500 hover:text-red-400"
                      aria-label={`Remove ${line.name} from order`}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                  {(line.optionLabels.length > 0 || line.extraLabels.length > 0) && (
                    <p className="text-[11px] text-zinc-500 mt-1">
                      {[...line.optionLabels, ...line.extraLabels].join(' · ')}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <QuantityControl
                      value={line.qty}
                      min={0}
                      onChange={(qty) => (qty < 1 ? removeLine(line.key) : updateQty(line.key, qty))}
                    />
                    <span className="text-brand-amber text-sm font-mono">{formatUGX(line.unitPrice * line.qty)}</span>
                  </div>
                </div>
              </div>
            ))
          )}

          {lines.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-zinc-500">Checkout details</p>
              {!customer && (
                <p className="text-xs text-zinc-500">
                  Already with us?{' '}
                  <Link to="/account" onClick={() => setIsOpen(false)} className="text-brand-amber">
                    Log in
                  </Link>{' '}
                  to fill your details.
                </p>
              )}
              <input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 80))}
                placeholder="Your name"
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.slice(0, 20))}
                placeholder="Phone number"
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm"
              />
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['dine-in', 'takeaway', 'delivery'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFulfillment(type)}
                    className={`py-2 rounded-full capitalize border ${
                      fulfillment === type ? 'bg-brand-amber text-zinc-950 border-brand-amber' : 'border-white/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {fulfillment === 'delivery' && (
                <div className="space-y-3 rounded-xl border border-brand-amber/30 p-3">
                  <label className="block text-xs uppercase tracking-widest text-zinc-500">Deliver to</label>
                  <select
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm"
                  >
                    <option value="">Choose destination</option>
                    {zones.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name} — {formatUGX(zone.fee)}
                      </option>
                    ))}
                  </select>
                  <input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value.slice(0, 160))}
                    placeholder="Street, estate or landmark"
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm"
                  />
                  {selectedZone && (
                    <p className="text-sm text-brand-amber">
                      Delivery fee: {formatUGX(selectedZone.fee)}
                    </p>
                  )}
                </div>
              )}
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 500))}
                placeholder="Notes (allergies, extra chilli…)"
                rows={2}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm"
              />
              {error && <p className="text-red-400 text-xs">{error}</p>}
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-3">
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Food</span>
              <span className="font-mono">{formatUGX(subtotal)}</span>
            </div>
            {fulfillment === 'delivery' && (
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Delivery</span>
                <span className="font-mono">{selectedZone ? formatUGX(deliveryFee) : '—'}</span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-brand-amber">{formatUGX(total)}</span>
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={placeOrder}
              className="w-full bg-brand-amber text-zinc-950 font-bold py-3 rounded-full hover:bg-brand-gold disabled:opacity-50"
            >
              {busy ? 'Saving…' : 'Place order on WhatsApp'}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
