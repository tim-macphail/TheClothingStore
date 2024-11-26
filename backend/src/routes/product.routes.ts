import { Router, Request, Response, RequestHandler } from 'express';
import { ProductController } from '../controllers/ProductController';

const router = Router();

router.get('/', (async (req: Request, res: Response) => {
    await ProductController.getAllProducts(req, res);
}) as RequestHandler);

router.get('/:id', (async (req: Request, res: Response) => {
    await ProductController.getProductById(req, res);
}) as RequestHandler);

router.post('/', (async (req: Request, res: Response) => {
    await ProductController.createProduct(req, res);
}) as RequestHandler);

router.put('/:id', (async (req: Request, res: Response) => {
    await ProductController.updateProduct(req, res);
}) as RequestHandler);

router.delete('/:id', (async (req: Request, res: Response) => {
    await ProductController.deleteProduct(req, res);
}) as RequestHandler);

export default router;