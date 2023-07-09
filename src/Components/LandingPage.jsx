import React, { useState } from "react";

const LandingPage = () => {
  const [cart, setCart] = useState([]);
  const [runningTotal, setRunningTotal] = useState(0);

  const pricingRules = {
    A: { price: 50, specialPrice: { quantity: 3, price: 130 } },
    B: { price: 30, specialPrice: { quantity: 2, price: 45 } },
    //special prices for A and B
  };

  const addItem = (item) => {
    const updatedBasket = [...cart, item];
    setCart(updatedBasket);
    calcRunningTotal(updatedBasket);
    //whenever an item is added/scanned this func is triggered
  };
  const removeItem = (item) => {
    const updatedBasket = cart.filter((val) => val !== item);
    setCart(updatedBasket);
    setRunningTotal(calcRunningTotal(updatedBasket));
  };

  const clearCart = () => {
    setCart([]);
    setRunningTotal(0);
  };

  const calcRunningTotal = (items) => {
    let totalPrice = 0;
    const itemCounts = {};

    items.forEach((item) => {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    });

    for (const item in itemCounts) {
      if (pricingRules[item]) {
        const { price, specialPrice } = pricingRules[item];
        const quantity = itemCounts[item];

        if (specialPrice && quantity >= specialPrice.quantity) {
          const specialPriceCount = Math.floor(
            quantity / specialPrice.quantity
          );
          const regularPriceCount = quantity % specialPrice.quantity;
          totalPrice +=
            specialPriceCount * specialPrice.price + regularPriceCount * price;
        } else {
          totalPrice += quantity * price;
        }
      }
    }

    setRunningTotal(totalPrice);
  };

  return (
    <div>
      <h1>CDL CHECKOUT</h1>
      <div>
        Enter the values:
        <input
          type="text"
          onChange={(e) => addItem(e.target.value.toUpperCase())}
        />
        <button onClick={clearCart}>Clear</button>
      </div>
      <p>Basket:</p>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item} <button onClick={() => removeItem(item)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the basket.</p>
      )}
      <p>Total: £{runningTotal / 100}</p>
    </div>
  );
};

export default LandingPage;
