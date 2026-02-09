// src/components/WhatsAppButton.jsx
import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = ({ itemName, itemPrice }) => {
  const phoneNumber = "256700000000"; // Replace with actual business number
  
  const handleOrder = () => {
    const message = `Hello Will-mar's! I'd like to order the ${itemName} (${itemPrice} UGX).`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button onClick={handleOrder} className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-amber mt-2 hover:text-white transition-colors">
      <MessageCircle size={12} /> Order Now
    </button>
  );
};