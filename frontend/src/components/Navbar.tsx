import { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'ACTIVEWEAR',
    subcategories: ['Running', 'Basketball', 'Skiing'],
  },
  {
    name: 'CASUAL',
    subcategories: ['Pants', 'Shirts', 'Sweaters'],
  },
  {
    name: 'FORMAL',
    subcategories: ['Suits', 'Dresses', 'Ties'],
  },
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      // outline: "1px solid red",
      backgroundColor: "lightgray",
      padding: "0.5rem",
    }}>
      <Link to="/"
        style={{
          // get rid of the underline
          textDecoration: "none",
          // make it bigger
          fontSize: "1.5rem",
        }}
      >
        🏠
      </Link>
      <div style={{
        display: "flex",
      }}>
        {categories.map((category, index) => (
          <div
            key={category.name}
            onMouseEnter={() => setActiveDropdown(index)}
            onMouseLeave={() => setActiveDropdown(null)}

            style={{
              // outline: "1px solid red",
              width: "10rem",
            }}
          >
            <button
              style={{
                // fill the width of the parent
                width: "100%",
                height: "100%",
              }}
                // no style change when pressed
              onMouseDown={(e) => e.preventDefault()}
            >
              {category.name}
            </button>
            {activeDropdown === index && (
              <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute", // this will make the dropdown appear on top of the other elements
                  // outline: "1px solid red",
                  backgroundColor: "lightgray",
                  width: "10rem",
                  padding: "0.5rem",
                }}>
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory}
                    to={`/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}

                    role="menuitem"
                  >
                    {subcategory}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <Link to="/cart"
        style={{
          // get rid of the underline
          textDecoration: "none",
          // make it bigger
          fontSize: "1.5rem",
        }}
      >
        🛒
      </Link>
    </nav>
  );
};

export default Navbar;