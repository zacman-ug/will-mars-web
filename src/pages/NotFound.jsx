import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-serif italic text-6xl">Lost the table?</h1>
      <p className="text-zinc-500 mt-4">That page isn’t on the menu.</p>
      <Link to="/menu" className="mt-8 bg-brand-amber text-zinc-950 px-8 py-3 rounded-full font-bold">
        Back to menu
      </Link>
    </div>
  );
}
