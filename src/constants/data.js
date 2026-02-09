// src/constants/data.js
export const MENU_DATA = {
  breakfast: [
    { id: 'br-01', name: "Katogo", price: "8,000", desc: "Traditional matooke and beef combination" },
    { id: 'br-02', name: "The Rolex", price: "6,000", desc: "Ugandan favorite - chapati rolled with eggs" },
    { id: 'br-03', name: "The Special", price: "10,000", desc: "Classic breakfast of eggs, sausages and toast" },
    { id: 'br-04', name: "Continental Breakfast", price: "20,000", desc: "Hearty breakfast with eggs, toast, tomatoes, potatoes, sausages and fresh fruit" }
  ],
  mainDishes: [
    { id: 'md-01', name: "Pilau & Beef", price: "20,000", desc: "Spiced rice with beef" },
    { id: 'md-02', name: "Chicken Wrap", price: "20,000", desc: "Chicken in flatbread wrap" },
    { id: 'md-03', name: "Beef Burger With Chips", price: "35,000", desc: "Beef patty in bun with fries" },
    { id: 'md-04', name: "Masala Chips", price: "22,000", desc: "Spiced, seasoned fries" },
    { id: 'md-05', name: "Spaghetti Bolognese", price: "27,000", desc: "Pasta with meat sauce" },
    { id: 'md-06', name: "Deep Fried Chicken (1Pc)", price: "14,000", desc: "Crispy fried chicken piece" },
    { id: 'md-07', name: "Chicken Nuggets With Chips", price: "35,000", desc: "Breaded chicken pieces with fries" },
    { id: 'md-08', name: "Roasted Chicken", price: "14,000", desc: "Oven-roasted chicken" }
  ],
  localFood: [
    { id: 'lf-01', name: "Beans", price: "11,000", desc: "Beans stew with side" },
    { id: 'lf-02', name: "Beef Luwombo", price: "27,000", desc: "Beef steamed in banana leaves" },
    { id: 'lf-03', name: "Gnuts", price: "11,000", desc: "Groundnut stew with side" },
    { id: 'lf-04', name: "Gnuts Luwombo", price: "15,000", desc: "Groundnut sauce steamed in banana leaves" },
    { id: 'lf-05', name: "Beef", price: "24,000", desc: "Beef stew with side" },
    { id: 'lf-06', name: "Chicken", price: "24,000", desc: "Chicken stew with side" },
    { id: 'lf-07', name: "Chicken Luwombo", price: "27,000", desc: "Chicken steamed in banana leaves" },
    { id: 'lf-08', name: "Fish", price: "24,000", desc: "Fish stew with side" },
    { id: 'lf-09', name: "Peas", price: "14,000", desc: "Peas stew with side" }
  ],
  quickBites: [
    { id: 'qb-01', name: "Chapati & Liver", price: "15,000", desc: "Chapati with liver" },
    { id: 'qb-02', name: "Fish Fingers & Chips", price: "27,000", desc: "Breaded fish strips with fries" },
    { id: 'qb-03', name: "Chicken & Chips", price: "24,000", desc: "Grilled chicken with fries" },
    { id: 'qb-04', name: "Sweet & Sour Goat Meat With Chips", price: "27,000", desc: "Tender goat in tangy sauce with fries" },
    { id: 'qb-05', name: "Beef Liver & Chips", price: "27,000", desc: "Sauteed liver with fries" },
    { id: 'qb-06', name: "Chicken Wings & Chips", price: "34,000", desc: "Crispy wings with french fries" },
    { id: 'qb-07', name: "Whole Fish Tilapia & Chips", price: "47,000", desc: "Whole grilled fish with fries" },
    { id: 'qb-08', name: "Sweet & Sour Goat Meat Plain", price: "20,000", desc: "Goat meat in sweet-sour sauce only" }
  ],
  snacks: [
    { id: 'sn-01', name: "Pair Of Vegetable Samosas", price: "3,500", desc: "Two veggie-filled crispy pastries" },
    { id: 'sn-02', name: "Plain Chapati", price: "1,300", desc: "Simple, fresh flatbread" },
    { id: 'sn-03', name: "Kebab", price: "5,000", desc: "Grilled meat skewers" },
    { id: 'sn-04', name: "Pair Of Beef Samosas", price: "4,000", desc: "Two crispy beef-filled pastries" },
    { id: 'sn-05', name: "Pair Of Beef Sausages", price: "5,000", desc: "Two grilled beef sausages" },
    { id: 'sn-06', name: "Chap", price: "5,000", desc: "Chap with your choice of filling" },
    { id: 'sn-07', name: "Pair Of Chicken Sausages", price: "5,000", desc: "Two grilled chicken sausages" }
  ],
  kidsMeals: [
    { id: 'km-01', name: "Chips & Chicken Nuggets With Soda", price: "11,000", desc: "Kid-sized nuggets and fries with drink" },
    { id: 'km-02', name: "Chips & Chicken With Soda", price: "11,000", desc: "Kid-sized chicken and fries with drink" },
    { id: 'km-03', name: "Chips & Sausages With Soda", price: "11,000", desc: "Kid-sized sausages and fries with drink" }
  ],
  desserts: [
    { id: 'ds-01', name: "Fruit Tray", price: "14,000", desc: "Assorted fresh fruits" },
    { id: 'ds-02', name: "Ice Cream (Per Scoop)", price: "4,000", desc: "Per scoop" }
  ],
  beverages: [
    { id: 'bv-01', name: "African Tea", price: "7,000", desc: "Spiced milk tea" },
    { id: 'bv-02', name: "Minute Maid", price: "3,000", desc: "Packaged juice" },
    { id: 'bv-03', name: "Soda", price: "2,000", desc: "Soft drinks" },
    { id: 'bv-04', name: "Fresh Juice", price: "7,000", desc: "Seasonal fruit juice" }
  ]
};

export const GALLERY_IMAGES = [
  { id: 'gal-01', src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80' },
  { id: 'gal-02', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80' },
  { id: 'gal-03', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80' },
  { id: 'gal-04', src: 'https://images.unsplash.com/photo-1550966842-28c4673899f7?auto=format&fit=crop&q=80' },
  { id: 'gal-05', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80' },
  { id: 'gal-06', src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80' },
];