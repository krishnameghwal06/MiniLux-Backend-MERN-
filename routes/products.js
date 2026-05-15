import express from "express";
import uploadFiles from "../middlewares/multer.js";
import { createProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/product.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post('/product/create', isAuth, uploadFiles, createProduct);
router.get('/product/all', getAllProducts);
router.get('/product/:id', getSingleProduct);
router.put('/product/:id', isAuth,  updateProduct);

export default router;