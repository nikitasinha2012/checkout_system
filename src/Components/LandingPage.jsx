import React, { useState } from "react";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [runningTotal, setRunningTotal] = useState(0);

  const specialPrices = {
    A: { price: 50, offers: { quantity: 3, price: 130 } },
    B: { price: 30, offers: { quantity: 2, price: 45 } },
    C: { price: 20, offers: {} },
    D: { price: 15, offers: {} },
    //special prices for A,B,C and D
  };

  const addItem = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    setRunningTotal(calculateRunningTotal(updatedCart));
    //add values to cart
  };

  const removeItem = (item) => {
    const itemIndex = cart.findIndex((val) => val === item);
    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(itemIndex, 1);
      setCart(updatedCart);
      setRunningTotal(calculateRunningTotal(updatedCart));
    }
  };

  const calculateRunningTotal = (items) => {
    let totalPrice = 0;
    const itemCounts = {};

    items.forEach((item) => {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    });

    for (const item in itemCounts) {
      if (specialPrices[item]) {
        const { price, offers } = specialPrices[item];
        const quantity = itemCounts[item];

        if (offers && quantity >= offers.quantity) {
          const specialPriceCount = Math.floor(quantity / offers.quantity);
          const regularPriceCount = quantity % offers.quantity;
          totalPrice +=
            specialPriceCount * offers.price + regularPriceCount * price;
        } else {
          totalPrice += quantity * price;
        }
      }
    }

    return totalPrice;
  };

  const clearCart = () => {
    setCart([]);
    setRunningTotal(0);
  };

  return (
    <div>
      <h1>CHECKOUT</h1>
      <p>Scan items:</p>
      <div>
        <button onClick={() => addItem("A")}>A</button>
        <button onClick={() => addItem("B")}>B</button>
        <button onClick={() => addItem("C")}>C</button>
        <button onClick={() => addItem("D")}>D</button>
      </div>
      <p>Shooping Cart:</p>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item} <button onClick={() => removeItem(item)}>X</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the basket.</p>
      )}
      <p>Total: £{runningTotal / 100}</p>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Checkout;
