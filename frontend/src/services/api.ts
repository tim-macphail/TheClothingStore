import axios from 'axios';

export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    category: string;
    size: string;
    color: string;
    stock_quantity: number;
    image_url?: string;
    created_at: string;
    updated_at: string;
}

const API_URL = 'http://localhost:3000/api';

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const getProduct = async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await axios.put(`${API_URL}/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/products/${id}`);
};