const useFormatPrice = (price: number) => {
  if (!price) return;
  return price.toLocaleString();
};

export default useFormatPrice;
