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

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-600";
    case "delivered":
      return "bg-blue-600";
    case "returned":
      return "bg-green-600";
    case "cancelled":
      return "bg-red-600";
    default:
      return "bg-gray-600";
  }
};
