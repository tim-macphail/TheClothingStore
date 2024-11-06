import { useState, useEffect } from 'react';
import { api, Product } from '../services/api';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await api.getAllProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError('Failed to load products');
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    };

    return { products, loading, error, refreshProducts: loadProducts };
};