export const rentalFormater = (data) => {
    // console.log(data)
  const formatedData = data.rentals.map((item, _) => ({
    name: item.customer,
    itemName: item.itemDetail.name,
    size: item.itemDetail.size,
    price: item.itemDetail.price,
    quantity: item.itemDetail.quantity
  }));
  return formatedData;
};
