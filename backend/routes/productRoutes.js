import express from 'express'

//Below shifed to productController.js
//import asyncHandler from 'express-async-handler'
//Import Model
//import Product from '../models/productModel.js'

//Import Controller
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts } from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()


/* Also we can use this
router.route('/').get(getProducts)
router.route('/:id').get(getProductById)
*/

// @description     Fetch All Products
// @route     GET /api/products
// @access    Public

//router.get('/', getProducts)

// @description     Fetch single Product by id
// @route     GET /api/products/:id
// @access    Public

//router.get('/:id',getProductById)

router
    .route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

router
    .route('/top')
    .get(getTopProducts)

router
    .route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct)

router
    .route('/:id/reviews')
    .post(protect, createProductReview)

export default router