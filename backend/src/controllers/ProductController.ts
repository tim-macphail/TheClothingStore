import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';

export class ProductController {
    static async getAllProducts(_req: Request, res: Response): Promise<Response> {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const products = await productRepository.find();
            return res.json(products);
        } catch (error) {
            console.error('Error in getAllProducts:', error);
            return res.status(500).json({ message: "Internal server error while fetching products" });
        }
    }

    static async getProductById(req: Request, res: Response): Promise<Response> {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const id = parseInt(req.params.id);
            const product = await productRepository.findOne({
                where: { id }
            });

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            return res.json(product);
        } catch (error) {
            console.error('Error in getProductById:', error);
            return res.status(500).json({ message: "Internal server error while fetching product" });
        }
    }

    static async createProduct(req: Request, res: Response): Promise<Response> {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const product = productRepository.create(req.body as Product);
            const result = await productRepository.save(product);
            return res.status(201).json(result);
        } catch (error) {
            console.error('Error in createProduct:', error);
            return res.status(500).json({ message: "Internal server error while creating product" });
        }
    }

    static async updateProduct(req: Request, res: Response): Promise<Response> {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const id = parseInt(req.params.id);
            const product = await productRepository.findOne({
                where: { id }
            });

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            productRepository.merge(product, req.body);
            const result = await productRepository.save(product);
            return res.json(result);
        } catch (error) {
            console.error('Error in updateProduct:', error);
            return res.status(500).json({ message: "Internal server error while updating product" });
        }
    }

    static async deleteProduct(req: Request, res: Response): Promise<Response> {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const id = parseInt(req.params.id);
            const product = await productRepository.findOne({
                where: { id }
            });

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            await productRepository.remove(product);
            return res.status(204).send();
        } catch (error) {
            console.error('Error in deleteProduct:', error);
            return res.status(500).json({ message: "Internal server error while deleting product" });
        }
    }
}