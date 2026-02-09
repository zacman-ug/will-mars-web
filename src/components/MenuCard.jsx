// src/sections/Menu.jsx
import React from 'react';
import { MENU_DATA } from '../constants/data';
import { WhatsAppButton } from '../components/WhatsAppButton';

const MenuCategory = ({ title, items }) => (
  <div className="mb-12">
    <h3 className="text-xl font-serif italic text-brand-gold border-b border-white/5 pb-2 mb-6 uppercase tracking-widest">{title}</h3>
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between items-start group">
          <div className="text-left">
            <h4 className="text-lg font-bold group-hover:text-brand-amber transition-colors">{item.name}</h4>
            <p className="text-sm text-zinc-500 italic">{item.desc}</p>
            <WhatsAppButton itemName={item.name} itemPrice={item.price} />
          </div>
          <span className="text-brand-amber font-mono font-bold whitespace-nowrap ml-4">{item.price} UGX</span>
        </div>
      ))}
    </div>
  </div>
);

export const Menu = () => (
  <section id="menu" className="py-24 bg-zinc-950 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-brand-gold font-bold uppercase tracking-[0.4em] text-sm mb-4">Will-mar's Selection</h2>
        <h3 className="text-5xl font-serif italic text-white">Full Menu</h3>
      </div>
      <div className="grid lg:grid-cols-2 gap-x-16">
        <MenuCategory title="Breakfast" items={MENU_DATA.breakfast} />
        <MenuCategory title="Local Delicacies" items={MENU_DATA.localFood} />
        <MenuCategory title="Main Dishes" items={MENU_DATA.mainDishes} />
        <MenuCategory title="Quick Bites & Snacks" items={MENU_DATA.snacks} />
        <MenuCategory title="Kid's Corner" items={MENU_DATA.kidsMeals} />
        <MenuCategory title="Desserts & Drinks" items={[...MENU_DATA.desserts, ...MENU_DATA.beverages]} />
      </div>
    </div>
  </section>
);