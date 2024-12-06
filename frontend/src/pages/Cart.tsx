import { useState } from "react";
import { Link } from "react-router-dom";
import shoppingCart from "../assets/shopping-cart.svg";

const Cart = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const mockCartItems = [
    {
      id: 1,
      name: "Item 1",
      price: 100,
    },
    {
      id: 2,
      name: "Item 2",
      price: 200,
    },
    {
      id: 3,
      name: "Item 3",
      price: 300,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh", // Ensure full viewport height
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Center the emoji
          backgroundColor: "lightgray", // Add contrast for better visibility
          overflow: "hidden", // Prevent overflow if the emoji gets too large
        }}
      >
        {isCheckingOut ? (
          <div>
            <h2>Billing Info</h2>
            <form>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <label>
                Address:
                <input type="text" name="address" />
              </label>
              <label>
                City:
                <input type="text" name="city" />
              </label>
              <label>
                State:
                <input type="text" name="state" />
              </label>
              <label>
                ZIP:
                <input type="text" name="zip" />
              </label>
            </form>

            <h2>Shipping Info</h2>

            <form>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <label>
                Address:
                <input type="text" name="address" />
              </label>
              <label>
                City:
                <input type="text" name="city" />
              </label>
              <label>
                State:
                <input type="text" name="state" />
              </label>
              <label>
                ZIP:
                <input type="text" name="zip" />
              </label>
            </form>
          </div>
        ) : (
          <img
            src={shoppingCart}
            alt="Shopping cart"
            style={{
              width: "70%",
              height: "70%",
            }}
          />
        )}
      </div>
      <div
        style={{
          width: "50%",
          padding: "1rem", // Add padding for content on the right
        }}
      >
        Right side
        <ul>
          {mockCartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
        {/* cancel and confirm buttons side by side at the bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => {
              setIsCheckingOut((prev) => !prev);
            }}
          >
            {isCheckingOut ? "Cancel" : <Link to={"/"}>Return to store</Link>}
          </button>
          <button
            onClick={() => {
              if (isCheckingOut) {
                alert("Order confirmed!");
              } else {
                setIsCheckingOut(true);
              }
            }}
          >
            {isCheckingOut ? "Confirm" : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
