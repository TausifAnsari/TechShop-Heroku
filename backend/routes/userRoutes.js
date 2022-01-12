import express from 'express'

//Import Controller
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router()

//router.post('/', registerUser)
router
    .route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)

router.post('/login', authUser)
//we use protect to protect the route from public access
//protect means only logged in user can access the route
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router
    .route('/:id')
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser)


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