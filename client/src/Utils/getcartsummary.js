export function carttotal(arr) {
  let total = 0;
  let quantity = 0;
  for (let item of arr) {
    total += item.price;
    quantity += item.quantity;
  }
  return { total, quantity };
}

const checkDuplicate = (arr, target) => {
  for (let item of arr) {
    if (item._id === target._id || item.title === target.title) {
      return true;
    }
  }
  return false;
};

export function handlecartduplicate(arr, target, operation) {
  const isPresent = checkDuplicate(arr, target);
  if (!isPresent) {
    arr.push(target);
    return arr;
  } else {
    arr = arr.map((item) => {
      if (item._id === target._id || item.title === target.title) {
        const singleitemprice = item.price / item.quantity;
        return {
          ...item,
          price:
            operation === "add"
              ? item.price + singleitemprice
              : item.price - singleitemprice,

          quantity: operation === "add" ? item.quantity + 1 : item.quantity - 1,
        };
      }
      return item;
    });
    return arr;
  }
}
