import { Link, Outlet, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { SITE } from '../constants/data';
import { waLink } from '../utils/format';

export function Layout() {
  const { pathname } = useLocation();
  const quietHome = pathname === '/';

  return (
    <div className="bg-zinc-950 text-zinc-100 font-sans min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      {!quietHome && (
        <>
          <a
            href={waLink(SITE.phone, `Hello ${SITE.name}! I have a question.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105"
          >
            <MessageCircle size={18} />
            <span className="font-bold text-sm hidden sm:inline">WhatsApp</span>
          </a>
          <Link
            to="/menu"
            className="fixed bottom-6 right-6 z-40 sm:hidden bg-brand-amber text-zinc-950 px-5 py-3 rounded-full font-bold text-sm shadow-2xl"
          >
            Order
          </Link>
        </>
      )}
    </div>
  );
}
