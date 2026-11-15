import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-serif italic text-6xl">Lost the table?</h1>
      <p className="text-zinc-500 mt-4">That page isn’t on the menu.</p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link to="/menu" className="bg-brand-amber text-zinc-950 px-8 py-3 rounded-full font-bold">
          Back to menu
        </Link>
        <Link to="/stays" className="border border-white/15 px-8 py-3 rounded-full text-sm">
          Stays
        </Link>
        <Link to="/bakery" className="border border-white/15 px-8 py-3 rounded-full text-sm">
          Bakery
        </Link>
      </div>
    </div>
  );
}
