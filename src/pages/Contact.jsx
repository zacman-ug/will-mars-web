import { useState } from 'react';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { SITE } from '../constants/data';
import { waLink } from '../utils/format';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <p className="text-brand-gold text-xs uppercase tracking-[0.4em] font-bold">Visit us</p>
      <h1 className="font-serif italic text-5xl mt-3 mb-12">Makamba Road, Kampala</h1>

      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <div className="space-y-6 text-zinc-300 mb-10">
            <div className="flex gap-4">
              <MapPin className="text-brand-amber" />
              <div>
                <p className="font-bold text-white">Address</p>
                <p>{SITE.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="text-brand-amber" />
              <div>
                <p className="font-bold text-white">Opening hours</p>
                {SITE.hours.map((row) => (
                  <p key={row.label} className="text-sm">
                    {row.label}: {row.value}
                  </p>
                ))}
                <p className="text-sm text-brand-amber mt-1">Happy Hour {SITE.happyHour}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="text-brand-amber" />
              <div>
                <p className="font-bold text-white">Reservations</p>
                <p>{SITE.phoneDisplay}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="text-brand-amber" />
              <div>
                <p className="font-bold text-white">Email</p>
                <p>{SITE.email}</p>
              </div>
            </div>
          </div>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-brand-gold"
          >
            <Navigation size={18} /> Get directions
          </a>
        </div>
        <div className="h-[420px] rounded-3xl overflow-hidden border border-white/10">
          <iframe
            title="Will-mar's map"
            src={SITE.mapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-20">
        <ReservationForm />
        <FeedbackForm />
      </div>
    </div>
  );
}

function ReservationForm() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2', note: '' });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const message = `Hello ${SITE.name}! I'd like to reserve a table.

Name: ${form.name}
Phone: ${form.phone}
Date: ${form.date}
Time: ${form.time}
Guests: ${form.guests}
${form.note ? `Note: ${form.note}` : ''}`;
    window.open(waLink(SITE.phone, message), '_blank');
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 space-y-4">
      <h2 className="font-serif italic text-3xl">Reserve a table</h2>
      <input required name="name" value={form.name} onChange={onChange} placeholder="Name" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3" />
      <input required name="phone" value={form.phone} onChange={onChange} placeholder="Phone" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3" />
      <div className="grid grid-cols-2 gap-3">
        <input required type="date" name="date" value={form.date} onChange={onChange} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3" />
        <input required type="time" name="time" value={form.time} onChange={onChange} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3" />
      </div>
      <select name="guests" value={form.guests} onChange={onChange} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3">
        {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
          <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
        ))}
      </select>
      <textarea name="note" value={form.note} onChange={onChange} placeholder="Occasion or requests" rows={3} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3" />
      <button className="w-full bg-brand-amber text-zinc-950 font-bold py-3 rounded-full">Send on WhatsApp</button>
      {sent && <p className="text-sm text-brand-amber">WhatsApp should open with your reservation request.</p>}
    </form>
  );
}

function FeedbackForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const message = `Hello ${SITE.name}! Feedback from ${form.name} (${form.email}):

${form.message}`;
    window.open(waLink(SITE.phone, message), '_blank');
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 space-y-4">
      <h2 className="font-serif italic text-3xl">We appreciate your feedback</h2>
      <p className="text-zinc-500 text-sm">Good or bad — if we didn’t make you feel looked after, tell us and we’ll make it right.</p>
      <input required name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3" />
      <input required type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3" />
      <textarea required name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How was your visit?" rows={5} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3" />
      <button className="w-full border border-brand-amber text-brand-amber font-bold py-3 rounded-full hover:bg-brand-amber hover:text-zinc-950">
        Send feedback
      </button>
      {sent && <p className="text-sm text-brand-amber">Thanks — we’ll be in touch.</p>}
    </form>
  );
}
