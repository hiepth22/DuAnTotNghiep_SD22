function formatPrice(value) {
  const formattedValue = new Intl.NumberFormat("vi-VN").format(value);
  const displayValue = formattedValue + " VNĐ";

  return displayValue;
}

export default formatPrice;
