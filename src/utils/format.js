export const formatUGX = (value) =>
  `${Number(value || 0).toLocaleString('en-UG')} UGX`;

export const extraPriceLabel = (value) =>
  Number(value) > 0 ? `+ ${formatUGX(value)}` : 'Included';

export const parsePrice = (value) => {
  if (typeof value === 'number') return value;
  return Number(String(value).replace(/,/g, '')) || 0;
};

export const waLink = (phone, text) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
