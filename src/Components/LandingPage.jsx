import React, { useState } from "react";

const LandingPage = () => {
  const [scan, setScan] = useState(false);
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
      <button onClick={setScan}>Start Scan</button>
      {scan ? (
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => addItem(e.target.value.toUpperCase())}
          />
          <p>S:</p>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>Total: £{runningTotal / 100}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LandingPage;
