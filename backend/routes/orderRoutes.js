import express from 'express'

//Import Controller
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js'
import {admin, protect} from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)

router.route('/myorders').get(protect, getMyOrders)

router.route('/:id').get(protect, getOrderById)

router.route('/:id/pay').put(protect, updateOrderToPaid)

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)






/* Also we can use this
// @description     Fetch All Products
// @route     GET /api/products
// @access    Public

router.get('/', getProducts)

// @description     Fetch single Product by id
// @route     GET /api/products/:id
// @access    Public

router.get('/:id',getProductById)*/

export default router