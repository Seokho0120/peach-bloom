const formatPrice = (price: number) => {
  if (!price) return;
  return price.toLocaleString();
};

export default formatPrice;
