// src/sections/About.jsx
export const About = () => (
  <section id="about" className="py-32 px-6 bg-zinc-950">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
      <div className="space-y-8">
        <h2 className="text-brand-gold font-bold uppercase tracking-[0.4em] text-sm">Our Essence</h2>
        <h3 className="text-4xl md:text-5xl font-serif italic leading-tight">
          Kampala’s favorite hangout on <span className="text-brand-amber">Makamba Road.</span>
        </h3>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Will-mar’s is more than just a restaurant; it’s a destination. Whether you're here for our 
          legendary Happy Hour cocktails, our vibrant Saturday nights, or our famous 
          All-You-Can-Eat Sunday spreads, we provide a premium atmosphere that feels like home.
        </p>
        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="border-l-2 border-brand-amber pl-4">
            <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-1">Happy Hour</h4>
            <p className="text-zinc-500 text-sm">Daily 5PM - 8PM</p>
          </div>
          <div className="border-l-2 border-brand-amber pl-4">
            <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-1">Sunday Brunch</h4>
            <p className="text-zinc-500 text-sm">All-you-can-eat Buffet</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <div className="absolute -inset-4 border border-brand-gold/20 rounded-2xl group-hover:border-brand-gold/40 transition-colors" />
        <img 
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80" 
          alt="Restaurant Interior" 
          className="rounded-2xl shadow-2xl relative z-10"
        />
      </div>
    </div>
  </section>
);