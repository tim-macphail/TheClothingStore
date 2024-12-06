// src/pages/Browse.tsx
import { useProducts } from "../hooks/useProducts";
import shirt from "../assets/shirtemoji.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Browse = () => {
  const { products, loading, error } = useProducts();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("");
  const [colors, setColors] = useState<string[]>([]);

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
      <h1>
        {decodeURIComponent(window.location.pathname.slice(1)).toUpperCase().replace("/", " > ")}
      </h1>
      <div style={{ display: "flex", }}>
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
            <h2>Filters</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {/* Price Filter */}
              <li>
                <label htmlFor="price-range">
                  <p>Price</p>
                </label>
                {/* two number inputs */}
                <input
                  type="number"
                  name="min"
                  id="price-range"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  name="max"
                  id="price-range"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </li>

              {/* Style Filter */}
              <li>
                <p>Style</p>
                <div>
                  <label>
                    <input type="radio" name="style" value="casual"
                      onChange={(e) => setStyle(e.target.value)}
                      checked={style === "casual"}
                    />
                    Casual
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="style" value="formal"
                      onChange={(e) => setStyle(e.target.value)}
                      checked={style === "formal"}
                    />
                    Formal
                  </label>
                </div>
              </li>

              {/* Size Filter */}
              <li>
                <p>Size</p>
                <div>
                  <label>
                    <input type="radio" name="size" value="small" checked={size === "small"} onChange={(e) => setSize(e.target.value)} />
                    Small
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="size" value="medium" checked={size === "medium"} onChange={(e) => setSize(e.target.value)} />
                    Medium
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="size" value="large" checked={size === "large"} onChange={(e) => setSize(e.target.value)} />
                    Large
                  </label>
                </div>
              </li>

              {/* Color Filter */}
              <li>
                <p>Color</p>
                <div>
                  <label>
                    <input type="checkbox" name="color" value="red" checked={colors.includes("red")} onChange={(e) => {
                      if (e.target.checked) {
                        setColors([...colors, e.target.value]);
                      } else {
                        setColors(colors.filter((color) => color !== e.target.value));
                      }
                    }} />
                    Red
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="color" value="blue" checked={colors.includes("blue")} onChange={(e) => {
                      if (e.target.checked) {
                        setColors([...colors, e.target.value]);
                      } else {
                        setColors(colors.filter((color) => color !== e.target.value));
                      }
                    }} />
                    Blue
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="color" value="green" checked={colors.includes("green")} onChange={(e) => {
                      if (e.target.checked) {
                        setColors([...colors, e.target.value]);
                      } else {
                        setColors(colors.filter((color) => color !== e.target.value));
                      }
                    }} />
                    Green
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              const sp = new URLSearchParams({
                minPrice,
                maxPrice,
                style,
                size,
                colors: colors.join(","),
              });

              window.location.search = sp.toString();
            }}
          >
            Apply
          </button>
          <button
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
              setStyle("");
              setSize("");
              setColors([]);
            }}
          >Reset</button>
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
                justifyContent: "space-between",
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
