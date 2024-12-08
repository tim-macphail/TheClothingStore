// src/pages/Browse.tsx
import { useProducts } from "../hooks/useProducts";
import shirt from "../assets/shirtemoji.png";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Browse = () => {
  const { products, loading, error } = useProducts();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("");
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setMinPrice(sp.get("minPrice") || "");
    setMaxPrice(sp.get("maxPrice") || "");
    setStyle(sp.get("style") || "");
    setSize(sp.get("size") || "");
    setColors((sp.get("colors") || "").split(",").filter(Boolean));
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(product => {
        // Price filter
        if (minPrice || maxPrice) {
            const price = product.price;
            const minPriceNum = minPrice ? parseFloat(minPrice) : 0;
            const maxPriceNum = maxPrice ? parseFloat(maxPrice) : Infinity;
            if (price < minPriceNum || price > maxPriceNum) return false;
        }

        // Style filter (casual/formal)
        if (style && style !== "") {
            if (product.style?.toLowerCase() !== style.toLowerCase()) return false;
        }

        // Size filter (small/medium/large)
        if (size && size !== "") {
            if (product.size?.toLowerCase() !== size.toLowerCase()) return false;
        }

        // Color filter (red/blue/green)
        if (colors.length > 0) {
            if (!product.color || !colors.includes(product.color.toLowerCase())) return false;
        }

        return true;
    });
  }, [products, minPrice, maxPrice, style, size, colors]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setStyle("");
    setSize("");
    setColors([]);
    window.history.pushState({}, '', window.location.pathname);
  };

  const applyFilters = () => {
    const sp = new URLSearchParams({
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(style && { style }),
      ...(size && { size }),
      ...(colors.length > 0 && { colors: colors.join(",") }),
    });

    const newUrl = `${window.location.pathname}?${sp.toString()}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0.5rem",
      }}
    >
      <h1>
        {decodeURIComponent(window.location.pathname.slice(1))
          .toUpperCase()
          .replace("/", " > ")}
      </h1>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
            padding: "0.5rem",
          }}
        >
          <div>
            <h2>Filters</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {/* Price Filter */}
              <li>
                <label htmlFor="price-range">
                  <p>Price</p>
                </label>
                <input
                  type="number"
                  name="min"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={{ marginRight: "5px", width: "70px" }}
                />
                <input
                  type="number"
                  name="max"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={{ width: "70px" }}
                />
              </li>

              {/* Style Filter */}
              <li>
                <p>Style</p>
                {['casual', 'formal'].map((styleOption) => (
                  <div key={styleOption}>
                    <label>
                      <input
                        type="radio"
                        name="style"
                        value={styleOption}
                        onChange={(e) => setStyle(e.target.value)}
                        checked={style === styleOption}
                      />
                      {styleOption.charAt(0).toUpperCase() + styleOption.slice(1)}
                    </label>
                  </div>
                ))}
              </li>

              {/* Size Filter */}
              <li>
                <p>Size</p>
                {['small', 'medium', 'large'].map((sizeOption) => (
                  <div key={sizeOption}>
                    <label>
                      <input
                        type="radio"
                        name="size"
                        value={sizeOption}
                        onChange={(e) => setSize(e.target.value)}
                        checked={size === sizeOption}
                      />
                      {sizeOption.charAt(0).toUpperCase() + sizeOption.slice(1)}
                    </label>
                  </div>
                ))}
              </li>

              {/* Color Filter */}
              <li>
                <p>Color</p>
                {['red', 'blue', 'green'].map((color) => (
                  <div key={color}>
                    <label>
                      <input
                        type="checkbox"
                        name="color"
                        value={color}
                        checked={colors.includes(color)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setColors([...colors, e.target.value]);
                          } else {
                            setColors(colors.filter((c) => c !== e.target.value));
                          }
                        }}
                      />
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </label>
                  </div>
                ))}
              </li>
            </ul>
          </div>
          <button
            onClick={applyFilters}
            style={{
              marginBottom: "10px",
              padding: "8px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
          <button
            onClick={resetFilters}
            style={{
              padding: "8px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            width: "80%",
            padding: "0.5rem",
          }}
        >
          {filteredProducts.length === 0 ? (
            <div style={{ gridColumn: "span 3", textAlign: "center", padding: "2rem" }}>
              No products match your filters
            </div>
          ) : (
            filteredProducts.map((product) => (
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
                  padding: "1rem",
                }}
                className="hover-enlarge"
              >
                <img
                  src={product.image_url || shirt}
                  alt={product.name}
                  style={{ width: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "0.5rem",
                  }}
                >
                  <p>${product.price}</p>
                  <p>{product.name}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;