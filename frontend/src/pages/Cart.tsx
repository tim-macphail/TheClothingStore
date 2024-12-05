import { Link } from "react-router-dom";

const Cart = () => {
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
        <span
          style={{
            fontSize: "calc(40vw)", // Dynamically fill the container
            lineHeight: "1", // Prevent extra spacing
          }}
        >
          🛒
        </span>
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
          <button>
            <Link to={"/"}>Cancel</Link>
          </button>
          <button>
            <Link to={"/checkout"}>Confirm</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
