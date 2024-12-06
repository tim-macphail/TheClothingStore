// src/pages/Item.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api, Product } from '../services/api';
import shirt from "../assets/shirtemoji.png";

const Item = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                    <button
                        style={{
                            padding: "10px 20px",
                            marginTop: "20px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            // TODO: Implement add to cart functionality
                            alert('Add to cart functionality coming soon!');
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Item;