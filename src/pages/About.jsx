import { Link } from 'react-router-dom';
import { SITE, SPECIALS } from '../constants/data';
import { MenuImage } from '../components/MenuImage';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="text-brand-gold text-xs uppercase tracking-[0.4em] font-bold">Our essence</p>
      <h1 className="font-serif italic text-5xl md:text-6xl mt-4 leading-tight">
        Kampala’s favorite hangout on <span className="text-brand-amber">Makamba Road.</span>
      </h1>
      <div className="grid md:grid-cols-2 gap-16 mt-12 items-start">
        <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
          <p>
            Will-mar’s is more than a restaurant; it’s a destination. Whether you’re here for legendary Happy Hour cocktails, vibrant Saturday nights, or the famous all-you-can-eat Sunday spread, we keep a premium atmosphere that still feels like home.
          </p>
          <p>
            The kitchen runs local stews and luwombo alongside burgers, chips, and a full bar. Come for katogo in the morning, stay for a Will-mar Special after five.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            {SPECIALS.map((item) => (
              <div key={item.title} className="border-l-2 border-brand-amber pl-4">
                <h2 className="font-bold text-white uppercase text-xs tracking-widest mb-1">{item.title}</h2>
                <p className="text-zinc-500 text-sm">{item.detail}</p>
                <p className="text-zinc-600 text-sm">{item.note}</p>
              </div>
            ))}
          </div>
          <Link to="/menu" className="inline-block bg-brand-amber text-zinc-950 px-8 py-3 rounded-full font-bold">
            See the menu
          </Link>
        </div>
        <MenuImage
          src="/images/site/interior.webp"
          alt="Restaurant interior"
          className="rounded-2xl shadow-2xl"
          width={1200}
          height={800}
        />
      </div>
      <p className="text-zinc-600 text-sm mt-16">{SITE.fullName} · {SITE.address}</p>
    </div>
  );
}
