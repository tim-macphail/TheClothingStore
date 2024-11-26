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

export const api = {
    async getAllProducts(): Promise<Product[]> {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    },

    async getProduct(id: number): Promise<Product> {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    },

    async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
        const response = await axios.post(`${API_URL}/products`, product);
        return response.data;
    },

    async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
        const response = await axios.put(`${API_URL}/products/${id}`, product);
        return response.data;
    },

    async deleteProduct(id: number): Promise<void> {
        await axios.delete(`${API_URL}/products/${id}`);
    }
};