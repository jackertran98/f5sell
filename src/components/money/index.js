export const handleMoney = (status, item, author) => {
  if (status === "") {
    return +item.PRICE;
  } else {
    if (item.GROUPS === "3") {
      return +item.PRICE;
    } else {
      return +item.PRICE_SHOW;
    }
  }
};
