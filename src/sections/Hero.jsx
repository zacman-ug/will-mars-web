// src/sections/Hero.jsx
export const Hero = () => (
  <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80" 
        alt="Will-mar's Atmosphere" 
        className="w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/80 to-zinc-950" />
    </div>

    <div className="relative z-10 text-center px-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <h1 className="text-7xl md:text-9xl font-serif italic font-bold mb-6 tracking-tight text-white">
        Will-mar’s
      </h1>
      <p className="text-xl md:text-2xl font-light text-zinc-300 mb-10 tracking-[0.2em] uppercase">
        Great Food • Great Cocktails • Great Times
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <a href="#menu" className="w-full sm:w-auto bg-brand-amber text-zinc-950 px-12 py-4 rounded-full font-bold text-lg hover:bg-brand-gold transition-all hover:scale-105 shadow-xl shadow-brand-amber/20">
          View Menu
        </a>
        <a href="#contact" className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
          Get Directions
        </a>
      </div>
    </div>
  </section>
);