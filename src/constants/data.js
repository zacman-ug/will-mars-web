const img = {
  breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80',
  eggs: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80',
  rolex: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
  stew: 'https://images.unsplash.com/photo-1544025162-d7669027d3f7?auto=format&fit=crop&w=900&q=80',
  luwombo: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
  rice: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=900&q=80',
  burger: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80',
  wrap: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a7?auto=format&fit=crop&w=900&q=80',
  chicken: 'https://images.unsplash.com/photo-1626645738193-c2d96067bbe2?auto=format&fit=crop&w=900&q=80',
  wings: 'https://images.unsplash.com/photo-1527477391470-b637a7d76f06?auto=format&fit=crop&w=900&q=80',
  chips: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&q=80',
  fish: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
  goat: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
  samosa: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
  kebab: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=900&q=80',
  sausage: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=80',
  kids: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80',
  fruit: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80',
  ice: 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80',
  tea: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=80',
  juice: 'https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?auto=format&fit=crop&w=900&q=80',
  soda: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=80',
  cocktail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
  mojito: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
  beer: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=900&q=80',
  wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80',
  beans: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
  interior: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
};

const sides = [
  { id: 'matooke', name: 'Matooke', price: 0 },
  { id: 'posho', name: 'Posho', price: 0 },
  { id: 'rice', name: 'Steamed rice', price: 0 },
  { id: 'chapati', name: 'Chapati', price: 1500 },
  { id: 'chips', name: 'Chips', price: 4000 },
];

const chipSwap = [
  { id: 'chips', name: 'Chips', price: 0 },
  { id: 'matooke', name: 'Matooke', price: 0 },
  { id: 'posho', name: 'Posho', price: 0 },
  { id: 'rice', name: 'Steamed rice', price: 0 },
  { id: 'chapati', name: 'Chapati', price: 1500 },
  { id: 'masala', name: 'Masala chips', price: 3000 },
  { id: 'salad', name: 'Garden salad', price: 0 },
  { id: 'plantain', name: 'Plantain', price: 3000 },
  { id: 'veg', name: 'Steamed vegetables', price: 0 },
];

const sodaChoice = [
  { id: 'coke', name: 'Coke', price: 0 },
  { id: 'fanta', name: 'Fanta', price: 0 },
  { id: 'sprite', name: 'Sprite', price: 0 },
  { id: 'water', name: 'Still water', price: 0 },
];

const eggChoice = [
  { id: 'fried', name: 'Fried eggs', price: 0 },
  { id: 'scrambled', name: 'Scrambled', price: 0 },
  { id: 'omelette', name: 'Omelette', price: 2000 },
];

const juiceIncluded = [
  { id: 'passion', name: 'Passion', price: 0 },
  { id: 'pineapple', name: 'Pineapple', price: 0 },
  { id: 'watermelon', name: 'Watermelon', price: 0 },
  { id: 'carrot', name: 'Carrot', price: 0 },
  { id: 'mixed', name: 'Mixed fruit', price: 2000 },
  { id: 'beetroot', name: 'Beetroot', price: 2000 },
];

const juiceAddOn = [
  { id: 'none', name: 'No juice', price: 0 },
  { id: 'passion', name: 'Passion', price: 7000 },
  { id: 'pineapple', name: 'Pineapple', price: 7000 },
  { id: 'watermelon', name: 'Watermelon', price: 7000 },
  { id: 'carrot', name: 'Carrot', price: 7000 },
  { id: 'mixed', name: 'Mixed fruit', price: 9000 },
  { id: 'beetroot', name: 'Beetroot', price: 8000 },
];

const sideOption = {
  id: 'side',
  label: 'Choice of accompaniment',
  required: true,
  choices: [
    ...sides,
    { id: 'masala', name: 'Masala chips', price: 5000 },
    { id: 'plantain', name: 'Plantain', price: 3000 },
    { id: 'salad', name: 'Garden salad', price: 0 },
    { id: 'veg', name: 'Steamed vegetables', price: 0 },
  ],
};

const juiceIncludedOption = {
  id: 'juice',
  label: 'Choice of juice',
  required: true,
  choices: juiceIncluded,
};

const juiceAddOnOption = {
  id: 'juice',
  label: 'Choice of juice',
  required: true,
  choices: juiceAddOn,
};

const extrasFood = [
  { id: 'egg', name: 'Add fried egg', price: 2000 },
  { id: 'sausage', name: 'Add pair of sausages', price: 5000 },
  { id: 'avocado', name: 'Add avocado', price: 3000 },
  { id: 'chapati-extra', name: 'Add chapati', price: 4500 },
  { id: 'salsa', name: 'Add salsa', price: 3500 },
  { id: 'coleslaw', name: 'Add coleslaw', price: 4000 },
  { id: 'cheese', name: 'Extra cheese', price: 3000 },
  { id: 'fruit-bowl', name: 'Add small fruit bowl', price: 6500 },
  { id: 'mayo', name: 'Add mayonnaise', price: 5500 },
  { id: 'onion-rings', name: 'Side onion rings', price: 6500 },
];

const extrasCommon = extrasFood;

const MEAL_CATEGORIES = new Set(['breakfast', 'localFood', 'mainDishes', 'quickBites', 'kidsMeals']);

const withMealOptions = (item) => {
  const mergeExtras = () => {
    const extras = [];
    const seen = new Set();
    [...extrasFood, ...(item.extras || [])].forEach((extra) => {
      if (seen.has(extra.id)) return;
      seen.add(extra.id);
      extras.push(extra);
    });
    return extras;
  };

  if (item.category === 'snacks' || item.category === 'sides') {
    return { ...item, extras: mergeExtras() };
  }

  if (!MEAL_CATEGORIES.has(item.category)) return item;

  const juiceGroup = item.category === 'breakfast' ? juiceIncludedOption : juiceAddOnOption;
  const otherOptions = (item.options || []).filter((group) => group.id !== 'side' && group.id !== 'juice');
  const existingSide = (item.options || []).find((group) => group.id === 'side');
  const sideGroup = existingSide
    ? { ...existingSide, label: 'Choice of accompaniment', required: true }
    : sideOption;

  return {
    ...item,
    options: [sideGroup, ...otherOptions, juiceGroup],
    extras: mergeExtras(),
  };
};

export const SITE = {
  name: 'Will-mar’s',
  fullName: 'Will-mar’s Bar & Restaurant',
  tagline: 'Great Food • Great Cocktails • Great Times',
  phone: '256700000000',
  phoneDisplay: '+256 700 000 000',
  email: 'hello@willmars.com',
  address: 'Makamba Road, Kampala, Uganda',
  instagram: 'https://www.instagram.com/willmarsrestaurant/',
  mapsUrl: 'https://maps.app.goo.gl/3A6yWzR7K4Z9XJ2A',
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.758832115167!2d32.574641!3d0.3015978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc506363a381%3A0xbaade1f1e1b19a1a!2sWill-mar's%20Bar%20%26%20Restaurant!5e0!3m2!1sen!2sug!4v1700000000000",
  hours: [
    { label: 'Monday – Friday', value: '11:00 AM – 12:00 AM' },
    { label: 'Saturday', value: '11:00 AM – 1:00 AM' },
    { label: 'Sunday', value: '10:00 AM – 11:00 PM' },
  ],
  happyHour: 'Daily 5:00 PM – 8:00 PM',
};

export const CATEGORIES = [
  { id: 'breakfast', name: 'Breakfast', blurb: 'Local favourites and hearty plates' },
  { id: 'localFood', name: 'Local Food', blurb: 'Stews and luwombo' },
  { id: 'mainDishes', name: 'Main Dishes', blurb: 'Grills, pasta and wraps' },
  { id: 'quickBites', name: 'Quick Bites', blurb: 'Satisfying plates, fast' },
  { id: 'snacks', name: 'Snacks', blurb: 'Small plates and street bites' },
  { id: 'kidsMeals', name: 'Kids Meals', blurb: 'Combos with a soda' },
  { id: 'sides', name: 'Sides', blurb: 'Extras for the table' },
  { id: 'desserts', name: 'Desserts', blurb: 'A sweet finish' },
  { id: 'beverages', name: 'Beverages', blurb: 'Tea, juice and sodas' },
  { id: 'cocktails', name: 'Cocktails', blurb: 'Happy hour signatures' },
  { id: 'beer', name: 'Beer', blurb: 'Cold and local' },
  { id: 'wine', name: 'Wine', blurb: 'By the glass or bottle' },
];

const RAW_MENU_ITEMS = [
  { id: 'br-01', category: 'breakfast', subcategory: 'Local Favourites', name: 'Katogo', price: 8000, desc: 'Traditional matooke and beef combination', image: img.stew, popular: true, options: [sideOption], extras: extrasCommon },
  { id: 'br-02', category: 'breakfast', subcategory: 'Local Favourites', name: 'The Rolex', price: 6000, desc: 'Ugandan favorite - chapati rolled with eggs', image: img.rolex, popular: true, options: [{ id: 'eggs', label: 'Eggs', required: true, choices: eggChoice }], extras: [{ id: 'beef', name: 'Add beef', price: 4000 }, { id: 'sausage', name: 'Add sausage', price: 3000 }] },
  { id: 'br-03', category: 'breakfast', subcategory: 'Classic Plates', name: 'The Special', price: 10000, desc: 'Classic breakfast of eggs, sausages and toast', image: img.eggs, options: [{ id: 'eggs', label: 'Choice of eggs', required: true, choices: eggChoice }, { id: 'bread', label: 'Choice of bread', required: true, choices: [{ id: 'white', name: 'White toast', price: 0 }, { id: 'brown', name: 'Brown toast', price: 0 }] }], extras: extrasCommon },
  { id: 'br-04', category: 'breakfast', subcategory: 'Classic Plates', name: 'Continental Breakfast', price: 20000, desc: 'Hearty breakfast with eggs, toast, tomatoes, potatoes, sausages and fresh fruit', image: img.breakfast, popular: true, options: [{ id: 'eggs', label: 'Choice of eggs', required: true, choices: eggChoice }] },

  { id: 'lf-01', category: 'localFood', subcategory: 'Stews', name: 'Beans', price: 11000, desc: 'Beans stew with side', image: img.beans, options: [sideOption] },
  { id: 'lf-09', category: 'localFood', subcategory: 'Stews', name: 'Peas', price: 14000, desc: 'Peas stew with side', image: img.beans, options: [sideOption] },
  { id: 'lf-03', category: 'localFood', subcategory: 'Stews', name: 'Gnuts', price: 11000, desc: 'Groundnut stew with side', image: img.stew, options: [sideOption] },
  { id: 'lf-05', category: 'localFood', subcategory: 'Stews', name: 'Beef', price: 24000, desc: 'Beef stew with side', image: img.stew, popular: true, options: [sideOption], extras: extrasCommon },
  { id: 'lf-06', category: 'localFood', subcategory: 'Stews', name: 'Chicken', price: 24000, desc: 'Chicken stew with side', image: img.chicken, options: [sideOption] },
  { id: 'lf-08', category: 'localFood', subcategory: 'Stews', name: 'Fish', price: 24000, desc: 'Fish stew with side', image: img.fish, options: [sideOption] },
  { id: 'lf-02', category: 'localFood', subcategory: 'Luwombo', name: 'Beef Luwombo', price: 27000, desc: 'Beef steamed in banana leaves', image: img.luwombo, popular: true, options: [sideOption] },
  { id: 'lf-04', category: 'localFood', subcategory: 'Luwombo', name: 'Gnuts Luwombo', price: 15000, desc: 'Groundnut sauce steamed in banana leaves', image: img.luwombo, options: [sideOption] },
  { id: 'lf-07', category: 'localFood', subcategory: 'Luwombo', name: 'Chicken Luwombo', price: 27000, desc: 'Chicken steamed in banana leaves', image: img.luwombo, options: [sideOption] },

  { id: 'md-01', category: 'mainDishes', subcategory: 'Grills & Plates', name: 'Pilau & Beef', price: 20000, desc: 'Spiced rice with beef', image: img.rice, popular: true },
  { id: 'md-08', category: 'mainDishes', subcategory: 'Grills & Plates', name: 'Roasted Chicken', price: 14000, desc: 'Oven-roasted chicken', image: img.chicken, options: [{ id: 'side', label: 'Accompaniment', required: true, choices: chipSwap }] },
  { id: 'md-06', category: 'mainDishes', subcategory: 'Grills & Plates', name: 'Deep Fried Chicken (1Pc)', price: 14000, desc: 'Crispy fried chicken piece', image: img.chicken, extras: [{ id: 'chips', name: 'Add chips', price: 8000 }, { id: 'coleslaw', name: 'Add coleslaw', price: 4000 }] },
  { id: 'md-03', category: 'mainDishes', subcategory: 'Burgers & Wraps', name: 'Beef Burger With Chips', price: 35000, desc: 'Beef patty in bun with fries', image: img.burger, popular: true, extras: [{ id: 'cheese', name: 'Extra cheese', price: 3000 }, { id: 'bacon', name: 'Add bacon', price: 5000 }, { id: 'egg', name: 'Add fried egg', price: 2000 }] },
  { id: 'md-02', category: 'mainDishes', subcategory: 'Burgers & Wraps', name: 'Chicken Wrap', price: 20000, desc: 'Chicken in flatbread wrap', image: img.wrap, extras: [{ id: 'chips', name: 'Add chips', price: 8000 }] },
  { id: 'md-05', category: 'mainDishes', subcategory: 'Pasta', name: 'Spaghetti Bolognese', price: 27000, desc: 'Pasta with meat sauce', image: img.pasta, extras: [{ id: 'cheese', name: 'Extra cheese', price: 3000 }] },
  { id: 'md-04', category: 'mainDishes', subcategory: 'Sides as mains', name: 'Masala Chips', price: 22000, desc: 'Spiced, seasoned fries', image: img.chips, extras: [{ id: 'mince', name: 'Add mince meat', price: 8000 }, { id: 'cheese', name: 'Add cheese', price: 4000 }] },
  { id: 'md-07', category: 'mainDishes', subcategory: 'Grills & Plates', name: 'Chicken Nuggets With Chips', price: 35000, desc: 'Breaded chicken pieces with fries', image: img.kids },

  { id: 'qb-01', category: 'quickBites', subcategory: 'With Chips', name: 'Chapati & Liver', price: 15000, desc: 'Chapati with liver', image: img.rolex },
  { id: 'qb-03', category: 'quickBites', subcategory: 'With Chips', name: 'Chicken & Chips', price: 24000, desc: 'Grilled chicken with fries', image: img.chicken, popular: true, options: [{ id: 'side', label: 'Swap chips', required: true, choices: chipSwap }] },
  { id: 'qb-02', category: 'quickBites', subcategory: 'With Chips', name: 'Fish Fingers & Chips', price: 27000, desc: 'Breaded fish strips with fries', image: img.fish, options: [{ id: 'side', label: 'Swap chips', required: true, choices: chipSwap }] },
  { id: 'qb-05', category: 'quickBites', subcategory: 'With Chips', name: 'Beef Liver & Chips', price: 27000, desc: 'Sauteed liver with fries', image: img.stew },
  { id: 'qb-06', category: 'quickBites', subcategory: 'With Chips', name: 'Chicken Wings & Chips', price: 34000, desc: 'Crispy wings with french fries', image: img.wings, popular: true, options: [{ id: 'side', label: 'Swap chips', required: true, choices: chipSwap }] },
  { id: 'qb-07', category: 'quickBites', subcategory: 'With Chips', name: 'Whole Fish Tilapia & Chips', price: 47000, desc: 'Whole grilled fish with fries', image: img.fish, options: [{ id: 'side', label: 'Swap chips', required: true, choices: chipSwap }] },
  { id: 'qb-04', category: 'quickBites', subcategory: 'Goat', name: 'Sweet & Sour Goat Meat With Chips', price: 27000, desc: 'Tender goat in tangy sauce with fries', image: img.goat },
  { id: 'qb-08', category: 'quickBites', subcategory: 'Goat', name: 'Sweet & Sour Goat Meat Plain', price: 20000, desc: 'Goat meat in sweet-sour sauce only', image: img.goat, options: [sideOption] },

  { id: 'sn-01', category: 'snacks', subcategory: 'Pastries', name: 'Pair Of Vegetable Samosas', price: 3500, desc: 'Two veggie-filled crispy pastries', image: img.samosa },
  { id: 'sn-04', category: 'snacks', subcategory: 'Pastries', name: 'Pair Of Beef Samosas', price: 4000, desc: 'Two crispy beef-filled pastries', image: img.samosa, popular: true },
  { id: 'sn-02', category: 'snacks', subcategory: 'Breads', name: 'Plain Chapati', price: 1300, desc: 'Simple, fresh flatbread', image: img.rolex },
  { id: 'sn-06', category: 'snacks', subcategory: 'Breads', name: 'Chap', price: 5000, desc: 'Chap with your choice of filling', image: img.rolex, options: [{ id: 'fill', label: 'Filling', required: true, choices: [{ id: 'beef', name: 'Beef', price: 0 }, { id: 'chicken', name: 'Chicken', price: 0 }, { id: 'beans', name: 'Beans', price: 0 }, { id: 'egg', name: 'Egg', price: 0 }] }] },
  { id: 'sn-03', category: 'snacks', subcategory: 'Grilled', name: 'Kebab', price: 5000, desc: 'Grilled meat skewers', image: img.kebab },
  { id: 'sn-05', category: 'snacks', subcategory: 'Grilled', name: 'Pair Of Beef Sausages', price: 5000, desc: 'Two grilled beef sausages', image: img.sausage },
  { id: 'sn-07', category: 'snacks', subcategory: 'Grilled', name: 'Pair Of Chicken Sausages', price: 5000, desc: 'Two grilled chicken sausages', image: img.sausage },

  { id: 'km-01', category: 'kidsMeals', subcategory: 'Combos', name: 'Chips & Chicken Nuggets With Soda', price: 11000, desc: 'Kid-sized nuggets and fries with drink', image: img.kids, options: [{ id: 'soda', label: 'Choice of soda', required: true, choices: sodaChoice }] },
  { id: 'km-02', category: 'kidsMeals', subcategory: 'Combos', name: 'Chips & Chicken With Soda', price: 11000, desc: 'Kid-sized chicken and fries with drink', image: img.kids, options: [{ id: 'soda', label: 'Choice of soda', required: true, choices: sodaChoice }] },
  { id: 'km-03', category: 'kidsMeals', subcategory: 'Combos', name: 'Chips & Sausages With Soda', price: 11000, desc: 'Kid-sized sausages and fries with drink', image: img.sausage, options: [{ id: 'soda', label: 'Choice of soda', required: true, choices: sodaChoice }] },

  { id: 'sd-01', category: 'sides', subcategory: 'Table extras', name: 'Chips', price: 8000, desc: 'Crispy golden fries', image: img.chips },
  { id: 'sd-02', category: 'sides', subcategory: 'Table extras', name: 'Masala Chips Side', price: 10000, desc: 'Small plate of spiced fries', image: img.chips },
  { id: 'sd-03', category: 'sides', subcategory: 'Table extras', name: 'Garden Salad', price: 8000, desc: 'Crisp greens with house dressing', image: img.fruit },
  { id: 'sd-04', category: 'sides', subcategory: 'Table extras', name: 'Plantain', price: 7000, desc: 'Fried ripe plantain', image: img.fruit },
  { id: 'sd-05', category: 'sides', subcategory: 'Table extras', name: 'Steamed Vegetables', price: 7000, desc: 'Seasonal garden vegetables', image: img.fruit },
  { id: 'sd-06', category: 'sides', subcategory: 'Table extras', name: 'Coleslaw', price: 4000, desc: 'Creamy cabbage slaw', image: img.fruit },

  { id: 'ds-01', category: 'desserts', subcategory: 'Sweet endings', name: 'Fruit Tray', price: 14000, desc: 'Assorted fresh fruits', image: img.fruit },
  { id: 'ds-02', category: 'desserts', subcategory: 'Sweet endings', name: 'Ice Cream (Per Scoop)', price: 4000, desc: 'Per scoop', image: img.ice, options: [{ id: 'flavour', label: 'Flavour', required: true, choices: [{ id: 'vanilla', name: 'Vanilla', price: 0 }, { id: 'chocolate', name: 'Chocolate', price: 0 }, { id: 'strawberry', name: 'Strawberry', price: 0 }] }] },

  { id: 'bv-01', category: 'beverages', subcategory: 'Hot', name: 'African Tea', price: 7000, desc: 'Spiced milk tea', image: img.tea, popular: true, options: [{ id: 'style', label: 'Style', required: true, choices: [{ id: 'spiced', name: 'Spiced', price: 0 }, { id: 'plain', name: 'Non-spiced', price: 0 }, { id: 'dawa', name: 'Dawa tea', price: 2000 }] }] },
  { id: 'bv-04', category: 'beverages', subcategory: 'Cold', name: 'Fresh Juice', price: 7000, desc: 'Seasonal fruit juice', image: img.juice, popular: true, options: [juiceIncludedOption] },
  { id: 'bv-02', category: 'beverages', subcategory: 'Cold', name: 'Minute Maid', price: 3000, desc: 'Packaged juice', image: img.juice },
  { id: 'bv-03', category: 'beverages', subcategory: 'Cold', name: 'Soda', price: 2000, desc: 'Soft drinks', image: img.soda, options: [{ id: 'soda', label: 'Choice of soda', required: true, choices: sodaChoice }] },
  { id: 'bv-05', category: 'beverages', subcategory: 'Cold', name: 'Still Water', price: 2000, desc: 'Bottled water', image: img.soda },
  { id: 'bv-06', category: 'beverages', subcategory: 'Hot', name: 'House Coffee', price: 7000, desc: 'Freshly brewed coffee', image: img.tea, options: [{ id: 'style', label: 'Style', required: true, choices: [{ id: 'white', name: 'White', price: 0 }, { id: 'black', name: 'Black', price: 0 }] }] },

  { id: 'ck-01', category: 'cocktails', subcategory: 'Signatures', name: 'Will-mar Special', price: 22000, desc: 'House rum mix with passion, citrus and a Kampala kick', image: img.cocktail, popular: true, options: [{ id: 'serve', label: 'Serve', required: true, choices: [{ id: 'single', name: 'Single', price: 0 }, { id: 'double', name: 'Double', price: 8000 }] }] },
  { id: 'ck-02', category: 'cocktails', subcategory: 'Signatures', name: 'Kampala Sunset', price: 20000, desc: 'Tropical fruit cocktail with a grenadine finish', image: img.mojito },
  { id: 'ck-03', category: 'cocktails', subcategory: 'Happy Hour', name: 'Classic Mojito', price: 18000, desc: 'Mint, lime, soda and rum — a Happy Hour favourite', image: img.mojito, popular: true },
  { id: 'ck-04', category: 'cocktails', subcategory: 'Happy Hour', name: 'Passion Punch', price: 18000, desc: 'Passion fruit, rum and soda', image: img.cocktail },
  { id: 'ck-05', category: 'cocktails', subcategory: 'Classics', name: 'Whiskey Sour', price: 22000, desc: 'Whiskey, lemon and a silky foam', image: img.cocktail },
  { id: 'ck-06', category: 'cocktails', subcategory: 'Classics', name: 'Classic Margarita', price: 22000, desc: 'Tequila, lime and triple sec', image: img.mojito },

  { id: 'brw-01', category: 'beer', subcategory: 'Local', name: 'Nile Special', price: 8000, desc: 'Uganda’s classic lager', image: img.beer, popular: true },
  { id: 'brw-02', category: 'beer', subcategory: 'Local', name: 'Club Pilsener', price: 8000, desc: 'Crisp local pilsener', image: img.beer },
  { id: 'brw-03', category: 'beer', subcategory: 'Local', name: 'Bell Lager', price: 8000, desc: 'Easy-drinking lager', image: img.beer },
  { id: 'brw-04', category: 'beer', subcategory: 'Stout', name: 'Guinness', price: 10000, desc: 'Rich dark stout', image: img.beer },
  { id: 'brw-05', category: 'beer', subcategory: 'Import', name: 'Tusker', price: 10000, desc: 'East African lager', image: img.beer },
  { id: 'brw-06', category: 'beer', subcategory: 'Import', name: 'Heineken', price: 12000, desc: 'Premium lager', image: img.beer },

  { id: 'wn-01', category: 'wine', subcategory: 'By the glass', name: 'House Red (Glass)', price: 18000, desc: 'Smooth house red', image: img.wine },
  { id: 'wn-02', category: 'wine', subcategory: 'By the glass', name: 'House White (Glass)', price: 18000, desc: 'Crisp house white', image: img.wine },
  { id: 'wn-03', category: 'wine', subcategory: 'Bottles', name: 'House Red (Bottle)', price: 75000, desc: 'Shareable bottle of house red', image: img.wine },
  { id: 'wn-04', category: 'wine', subcategory: 'Bottles', name: 'House White (Bottle)', price: 75000, desc: 'Shareable bottle of house white', image: img.wine },
];

export const MENU_ITEMS = RAW_MENU_ITEMS.map(withMealOptions).map((item) => ({
  ...item,
  image: `/images/menu/${item.id}.webp`,
}));

export const GALLERY_IMAGES = [
  { id: 'gal-01', src: '/images/gallery/gal-01.webp', alt: 'Cocktails at the bar' },
  { id: 'gal-02', src: '/images/gallery/gal-02.webp', alt: 'Dining room atmosphere' },
  { id: 'gal-03', src: '/images/gallery/gal-03.webp', alt: 'Evening service' },
  { id: 'gal-04', src: '/images/gallery/gal-04.webp', alt: 'Table setting' },
  { id: 'gal-05', src: '/images/gallery/gal-05.webp', alt: 'Plated dish' },
  { id: 'gal-06', src: '/images/gallery/gal-06.webp', alt: 'Guests at dinner' },
  { id: 'gal-07', src: '/images/gallery/gal-07.webp', alt: 'Grill night' },
  { id: 'gal-08', src: '/images/gallery/gal-08.webp', alt: 'Local food' },
  { id: 'gal-09', src: '/images/gallery/gal-09.webp', alt: 'Cold beers' },
];

export const REVIEWS = [
  { name: 'Aisha N.', text: 'The luwombo tastes like home, and Happy Hour cocktails are dangerously good. Makamba Road’s hangout for a reason.', rating: 5 },
  { name: 'Daniel K.', text: 'Came for the Rolex, stayed for the Saturday night energy. Service was warm and the pilau was spot on.', rating: 5 },
  { name: 'Patricia M.', text: 'Brought the kids for nuggets and soda, then ordered tilapia for ourselves. Generous portions, fair prices.', rating: 5 },
  { name: 'Ivan S.', text: 'Sunday spread was packed but they still made us feel looked after. Will-mar’s is our default for visitors.', rating: 4 },
];

export const SPECIALS = [
  { title: 'Happy Hour', detail: SITE.happyHour, note: 'Selected cocktails and beers' },
  { title: 'Saturday Nights', detail: 'From 8:00 PM', note: 'Music, grills and a full bar' },
  { title: 'Sunday Brunch', detail: 'All-you-can-eat buffet', note: 'From 10:00 AM' },
];

export const getItemById = (id) => MENU_ITEMS.find((item) => item.id === id);

export const getCategory = (id) => CATEGORIES.find((cat) => cat.id === id);

export const groupBySubcategory = (items) => {
  const groups = [];
  const map = new Map();
  items.forEach((item) => {
    const key = item.subcategory || 'Menu';
    if (!map.has(key)) {
      const group = { title: key, items: [] };
      map.set(key, group);
      groups.push(group);
    }
    map.get(key).items.push(item);
  });
  return groups;
};

export const lineBreakdown = (item, selectedOptions = {}, selectedExtras = []) => {
  const parts = [{ label: item.name, amount: item.price }];

  Object.entries(selectedOptions).forEach(([groupId, choiceId]) => {
    const group = item.options?.find((opt) => opt.id === groupId);
    const choice = group?.choices?.find((c) => c.id === choiceId);
    if (!group || !choice) return;
    parts.push({
      label: `${group.label}: ${choice.name}`,
      amount: choice.price || 0,
    });
  });

  (item.extras || [])
    .filter((extra) => selectedExtras.includes(extra.id))
    .forEach((extra) => {
      parts.push({ label: extra.name, amount: extra.price });
    });

  const unit = parts.reduce((sum, part) => sum + part.amount, 0);
  return { parts, unit };
};

export const lineTotal = (item, qty, selectedOptions = {}, selectedExtras = []) =>
  lineBreakdown(item, selectedOptions, selectedExtras).unit * qty;
