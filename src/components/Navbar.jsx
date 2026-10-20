import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogIn, Menu, ShoppingBag, X } from 'lucide-react';
import { SITE } from '../constants/data';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { count, setIsOpen: setCartOpen } = useCart();
  const { customer, logout } = useAuth();

  return (
    <nav className="fixed w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif italic font-bold text-brand-amber">
          {SITE.name}
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-bold">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `hover:text-brand-amber transition-colors ${isActive ? 'text-brand-amber' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {customer ? (
            <button type="button" onClick={logout} className="hidden sm:inline text-[10px] uppercase tracking-widest text-zinc-400 hover:text-brand-amber">
              Hi, {customer.firstName} · Log out
            </button>
          ) : (
            <Link to="/account" className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-brand-amber">
              <LogIn size={14} /> Log in
            </Link>
          )}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-brand-amber"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-amber text-zinc-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <Link
            to="/menu"
            className="hidden sm:inline-flex bg-brand-amber text-zinc-950 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-gold"
          >
            Order now
          </Link>
          <button className="md:hidden text-brand-amber" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-white/10 p-6 flex flex-col gap-4 uppercase text-xs font-bold tracking-widest">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          {customer ? (
            <button type="button" onClick={() => { logout(); setIsOpen(false); }}>
              Log out
            </button>
          ) : (
            <NavLink to="/account" onClick={() => setIsOpen(false)}>
              Log in
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};
