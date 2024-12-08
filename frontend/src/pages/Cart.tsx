import { useState } from "react";
import { Link } from "react-router-dom";
import shoppingCart from "../assets/shopping-cart.svg";
import { useCart } from '../context/CartContext';
import shirt from "../assets/shirtemoji.png";

const Cart = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const BillingForm = () => (
    <div>
      <h2>Billing Info</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
        {/* credit card payment details */}
        <h2>Credit Card Info</h2>
        <label>
          Card Number:
          <input type="text" name="cardNumber" />
        </label>
        <label>
          Expiration Date:
          <input type="text" name="expirationDate" />
        </label>
        <label>
          CVV:
          <input type="text" name="cvv" />
        </label>
      </form>

      <h2>Shipping Info</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* checkbox for same as billing info */}
        <label htmlFor="">Same as billing info
          <input type="checkbox" name="sameAsBilling" checked={sameAsBilling} onChange={() => setSameAsBilling(!sameAsBilling)} />
        </label>
        {!sameAsBilling && <>
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
        </>}
      </form>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "lightgray",
          overflow: "auto",
          padding: "2rem",
        }}
      >
        {isCheckingOut ? (
          <BillingForm />
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
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2>Your Cart</h2>
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div style={{ marginBottom: '2rem' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    borderBottom: '1px solid #eee',
                    gap: '1rem'
                  }}
                >
                  <img
                    src={item.image_url || shirt}
                    alt={item.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div>{item.name}</div>
                    <div>${item.price}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input
                      type="number"
                      min="1"
                      max={item.stock_quantity}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      style={{ width: '60px' }}
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <h3>Total: ${getCartTotal().toFixed(2)}</h3>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <button
            onClick={() => {
              setIsCheckingOut(false);
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {isCheckingOut ? "Cancel" : <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Return to store</Link>}
          </button>
          <button
            onClick={() => {
              if (isCheckingOut) {
                alert("Order confirmed!");
                window.location.href = '/';
              } else {
                setIsCheckingOut(true);
              }
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            disabled={items.length === 0}
          >
            {isCheckingOut ? "Confirm" : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;