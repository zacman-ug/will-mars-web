// src/sections/Location.jsx
import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export const Location = () => (
  <section id="contact" className="py-24 px-6 bg-zinc-900/20 border-y border-white/5">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div className="text-left">
        <h2 className="text-4xl font-serif italic mb-8 text-brand-gold">Visit Us</h2>
        <div className="space-y-6 text-zinc-300">
          <div className="flex gap-4 group">
            <MapPin className="text-brand-amber" />
            <div>
              <p className="font-bold text-white">Address</p>
              <p>Makamba Road, Kampala, Uganda</p>
            </div>
          </div>
          <div className="flex gap-4 group">
            <Clock className="text-brand-amber" />
            <div>
              <p className="font-bold text-white">Opening Hours</p>
              <p>Daily: 11:00 AM - 12:00 AM</p>
            </div>
          </div>
          <div className="flex gap-4 group">
            <Phone className="text-brand-amber" />
            <div>
              <p className="font-bold text-white">Reservations</p>
              <p>+256 700 000 000</p>
            </div>
          </div>
        </div>
        <a href="https://maps.app.goo.gl/3A6yWzR7K4Z9XJ2A" target="_blank" className="inline-flex mt-10 items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-brand-gold transition-all">
          <Navigation size={18} /> Get Directions
        </a>
      </div>
      <div className="h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.758832115167!2d32.574641!3d0.3015978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc506363a381%3A0xbaade1f1e1b19a1a!2sWill-mar's%20Bar%20%26%20Restaurant!5e0!3m2!1sen!2sug!4v1700000000000" 
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
);