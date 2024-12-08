import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api, Product } from '../services/api';
import { useCart } from '../context/CartContext';
import shirt from "../assets/shirtemoji.png";

const Item = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                if (!id) return;
                const data = await api.getProduct(parseInt(id));
                setProduct(data);
            } catch (err) {
                setError('Failed to load product');
                console.error('Error loading product:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product not found</div>;

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            alert('Added to cart!');
        }
    };

    return (
        <div style={{
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
        }}>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
            }}>
                <div>
                    <img
                        src={product.image_url || shirt}
                        alt={product.name}
                        style={{
                            width: "100%",
                            maxHeight: "500px",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div>
                    <h1>{product.name}</h1>
                    <p>Price: ${product.price}</p>
                    <p>Size: {product.size}</p>
                    <p>Color: {product.color}</p>
                    <p>Category: {product.category}</p>
                    {product.description && <p>Description: {product.description}</p>}
                    <p>Stock: {product.stock_quantity} available</p>
                    
                    <div style={{ 
                        marginTop: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        <label>
                            Quantity:
                            <input
                                type="number"
                                min="1"
                                max={product.stock_quantity}
                                value={quantity}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value) && value >= 1 && value <= product.stock_quantity) {
                                        setQuantity(value);
                                    }
                                }}
                                style={{
                                    marginLeft: "10px",
                                    width: "60px",
                                    padding: "5px"
                                }}
                            />
                        </label>
                    </div>

                    <button
                        style={{
                            padding: "10px 20px",
                            marginTop: "20px",
                            backgroundColor: product.stock_quantity > 0 ? "#007bff" : "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: product.stock_quantity > 0 ? "pointer" : "not-allowed",
                        }}
                        onClick={handleAddToCart}
                        disabled={product.stock_quantity === 0}
                    >
                        {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Item;