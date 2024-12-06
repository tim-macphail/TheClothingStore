// src/pages/Browse.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shirt from "../assets/shirtemoji.png";
import { getProducts, Product } from '../services/api';
import './index.css';

const CATEGORIES = {
    clothing: ['t-shirt', 'pants'],
    footwear: ['shoes'],
    accessories: ['hat', 'belt', 'scarf', 'gloves', 'socks'],
    jewelry: ['watch', 'bracelet', 'necklace', 'earrings', 'ring'],
    bags: ['backpack', 'purse', 'wallet'],
    other: ['sunglasses']
};

const Browse = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        searchTerm: '',
        priceRange: 'all',
        category: 'all',
        size: 'all',
        color: 'all'
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching products...');
                const data = await getProducts();
                console.log('Products received:', data);
                setProducts(data);
                setFilteredProducts(data);
                setError(null);
            } catch (err) {
                console.error('Error details:', err);
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;

        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            result = result.filter(product => 
                product.name.toLowerCase().includes(searchLower) ||
                (product.category && product.category.toLowerCase().includes(searchLower)) ||
                (product.color && product.color.toLowerCase().includes(searchLower))
            );
        }

        if (filters.priceRange !== 'all') {
            result = result.filter(product => {
                switch (filters.priceRange) {
                    case 'under100':
                        return product.price < 100;
                    case '100to500':
                        return product.price >= 100 && product.price <= 500;
                    case 'over500':
                        return product.price > 500;
                    default:
                        return true;
                }
            });
        }

        // Category filter
        if (filters.category !== 'all') {
            result = result.filter(product => 
                product.category.toLowerCase() === filters.category.toLowerCase()
            );
        }

        // Size filter
        if (filters.size !== 'all') {
            result = result.filter(product => 
                product.size.toLowerCase() === filters.size.toLowerCase()
            );
        }

        // Color filter
        if (filters.color !== 'all') {
            result = result.filter(product => 
                product.color.toLowerCase() === filters.color.toLowerCase()
            );
        }

        setFilteredProducts(result);
    }, [filters, products]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, searchTerm: event.target.value }));
    };

    const handleFilterChange = (filterType: string, value: string) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const sizes = ['all', ...new Set(products.map(p => p.size))];
    const colors = ['all', ...new Set(products.map(p => p.color))];

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
        }}>
            <h1 style={{ outline: "1px solid blue" }}>
                {window.location.pathname.slice(1).toUpperCase().replace("/", " > ")}
            </h1>

            {/* Search Bar */}
            <div style={{ margin: "20px 0", padding: "0 20px" }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.searchTerm}
                    onChange={handleSearchChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px"
                    }}
                />
            </div>

            <div style={{
                display: "flex",
                outline: "1px solid green",
            }}>
                {/* Filters Panel */}
                <div style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                }}>
                    <h3>Filters</h3>
                    
                    {/* Price Range Filter */}
                    <div style={{ marginBottom: "20px" }}>
                        <h4>Price Range</h4>
                        <select 
                            value={filters.priceRange}
                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                            style={{ width: "100%", padding: "5px" }}
                        >
                            <option value="all">All Prices</option>
                            <option value="under100">Under $100</option>
                            <option value="100to500">$100 - $500</option>
                            <option value="over500">Over $500</option>
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div style={{ marginBottom: "20px" }}>
                        <h4>Category</h4>
                        <select 
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            style={{ width: "100%", padding: "5px" }}
                        >
                            <option value="all">All Categories</option>
                            <optgroup label="Clothing">
                                <option value="t-shirt">T-Shirt</option>
                                <option value="pants">Pants</option>
                            </optgroup>
                            <optgroup label="Footwear">
                                <option value="shoes">Shoes</option>
                            </optgroup>
                            <optgroup label="Accessories">
                                <option value="hat">Hat</option>
                                <option value="belt">Belt</option>
                                <option value="scarf">Scarf</option>
                                <option value="gloves">Gloves</option>
                                <option value="socks">Socks</option>
                            </optgroup>
                            <optgroup label="Jewelry">
                                <option value="watch">Watch</option>
                                <option value="bracelet">Bracelet</option>
                                <option value="necklace">Necklace</option>
                                <option value="earrings">Earrings</option>
                                <option value="ring">Ring</option>
                            </optgroup>
                            <optgroup label="Bags">
                                <option value="backpack">Backpack</option>
                                <option value="purse">Purse</option>
                                <option value="wallet">Wallet</option>
                            </optgroup>
                            <optgroup label="Other">
                                <option value="sunglasses">Sunglasses</option>
                            </optgroup>
                        </select>
                    </div>

                    {/* Size Filter */}
                    <div style={{ marginBottom: "20px" }}>
                        <h4>Size</h4>
                        <select 
                            value={filters.size}
                            onChange={(e) => handleFilterChange('size', e.target.value)}
                            style={{ width: "100%", padding: "5px" }}
                        >
                            {sizes.map(size => (
                                <option key={size} value={size}>
                                    {size.charAt(0).toUpperCase() + size.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Color Filter */}
                    <div style={{ marginBottom: "20px" }}>
                        <h4>Color</h4>
                        <select 
                            value={filters.color}
                            onChange={(e) => handleFilterChange('color', e.target.value)}
                            style={{ width: "100%", padding: "5px" }}
                        >
                            {colors.map(color => (
                                <option key={color} value={color}>
                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 2fr)",
                    outline: "1px solid pink",
                    width: "80%",
                    gap: "20px",
                    padding: "20px",
                }}>
                    {filteredProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/item/${product.id}`}
                            style={{
                                outline: "1px solid blue",
                                display: "flex",
                                flexDirection: "column",
                                textDecoration: "none",
                                backgroundColor: "white",
                                padding: "10px",
                            }}
                            className='hover-enlarge'
                        >
                            <img src={product.image_url || shirt} alt={product.name} width={"100%"} />
                            <div style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                marginTop: "10px",
                            }}>
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