// src/pages/Browse.tsx
import { useProducts } from "../hooks/useProducts";
import shirt from "../assets/shirtemoji.png";
import { Link } from "react-router-dom";
import "./index.css";

const Browse = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0.5rem",
      }}
    >
      <h1
        style={
          {
            // outline: "1px solid blue",
          }
        }
      >
        {window.location.pathname.slice(1).toUpperCase().replace("/", " > ")}
      </h1>
      <div
        style={{
          display: "flex",
          // outline: "1px solid green",
        }}
      >
        <div
          style={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
            padding: "0.5rem",
          }}
        >
          {/* Filters for price, style, size, and color */}
          <div>
            <p>Filters</p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {/* Price Filter */}
              <li>
                <label htmlFor="price-range">
                  <p>Price</p>
                </label>
                Min
                <input type="range" id="price-range" name="price" />
                Max
                <input type="range" id="price-range" name="price" />
              </li>

              {/* Style Filter */}
              <li>
                <p>Style</p>
                <div>
                  <label>
                    <input type="radio" name="style" value="casual" />
                    Casual
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="style" value="formal" />
                    Formal
                  </label>
                </div>
              </li>

              {/* Size Filter */}
              <li>
                <p>Size</p>
                <div>
                  <label>
                    <input type="radio" name="size" value="small" />
                    Small
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="size" value="medium" />
                    Medium
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="size" value="large" />
                    Large
                  </label>
                </div>
              </li>

              {/* Color Filter */}
              <li>
                <p>Color</p>
                <div>
                  <label>
                    <input type="checkbox" name="color" value="red" />
                    Red
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="color" value="blue" />
                    Blue
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="color" value="green" />
                    Green
                  </label>
                </div>
              </li>
            </ul>
          </div>
          {/* apply button */}
          <button>Apply</button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 2fr)",
            outline: "1px solid pink",
            width: "80%",
          }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/item/${product.id}`}
              style={{
                outline: "1px solid blue",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                backgroundColor: "white",
              }}
              className="hover-enlarge"
            >
              <img
                src={product.image_url || shirt}
                alt={product.name}
                width={"100%"}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <p>${product.price}</p>
                <p>{product.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
