// src/sections/Footer.jsx
import React from 'react';
import { Instagram, Facebook, X, MessageCircle, ShoppingBag } from 'lucide-react';

export const Footer = () => {
  const instagramLink = "https://www.instagram.com/willmarsrestaurant/";
  const whatsappNumber = "256700000000"; 
  const orderMessage = encodeURIComponent("Hello Will-mar's! I'd like to place an order.");
  const inquiryMessage = encodeURIComponent("Hello Will-mar's! I have a question.");

  return (
    <footer className="relative py-12 px-6 bg-zinc-950 text-center border-t border-white/5">
      {/* 1. Clickable Social Icons with X Branding */}
      <div className="flex justify-center gap-8 mb-8 text-zinc-400">
        <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="hover:text-brand-amber transition-all hover:scale-110">
          <Instagram size={20}/>
        </a>
        <a href="#" className="hover:text-brand-amber transition-all hover:scale-110">
          <Facebook size={20}/>
        </a>
        <a href="#" className="hover:text-brand-amber transition-all hover:scale-110">
          <X size={20}/>
        </a>
      </div>

      {/* Copyright Info */}
      <div className="space-y-2 mb-8">
        <p className="text-xs text-zinc-600 uppercase tracking-widest">
          © {new Date().getFullYear()} Will-mar’s Bar & Restaurant
        </p>
        <p className="text-[10px] text-zinc-700 uppercase tracking-[0.2em]">
          Makamba Road, Kampala, Uganda
        </p>
      </div>

      {/* 2. Floating Action Buttons (Right Side) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${inquiryMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
        >
          <MessageCircle size={18} />
          <span className="font-bold text-sm">Text on WhatsApp</span>
        </a>

        <a 
          href={`https://wa.me/${whatsappNumber}?text=${orderMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FFC107] text-black px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
        >
          <ShoppingBag size={18} />
          <span className="font-bold text-sm">Order Now</span>
        </a>
      </div>
    </footer>
  );
};