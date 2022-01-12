import asyncHandler from 'express-async-handler'

//Import Model
import Product from '../models/productModel.js'


//note: we use try catch block inside the async function in routes.
// But instead of that we are using a package called express-async-handler which handles exceptions It is a predefined middleware
// We just need to wrap asyncHandler to the asynchronous function

// @description     Fetch All Products
// @route     GET /api/products
// @access    Public

const getProducts = asyncHandler(async(req, res) => {
    //for pagination functionality
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    //for search functionality we adding keyword 
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    // const count = await Product.count({...keyword})
    const count = await Product.countDocuments({...keyword})

    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
    // const products = await Product.find({})
    res.json({products, page, pages:Math.ceil(count / pageSize)})
})

// @description     Fetch single Product by id
// @route     GET /api/products/:id
// @access    Public

const getProductById = asyncHandler(async(req, res) => {
    //const product = Product.find((p) => p._id === req.params.id)
    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    }
    else {
        //res.status(404).json({message: 'Product not found'})
        res.status(404)
        //does same as above since we added error handling middleware we can directly throw the error
        throw new Error('Product not found')
    }
})

// @description     Delete single Product by id
// @route     Delete /api/products/:id
// @access    Private and only for Admin - means can only be accessed by a admin user, we have a field isAdmin in User Model

const deleteProduct = asyncHandler(async(req, res) => {
    //const product = Product.find((p) => p._id === req.params.id)
    const product = await Product.findById(req.params.id)
    if(product) {
        //we can also add if an admin who created the product should only delete it then we need to add condition
        await product.remove()
        res.json({message : 'Product Removed'})
    }
    else {
        //res.status(404).json({message: 'Product not found'})
        res.status(404)
        //does same as above since we added error handling middleware we can directly throw the error
        throw new Error('Product not found')
    }

})

// @description     Create a product
// @route     Post /api/products
// @access    Private and only for Admin - means can only be accessed by a admin user, we have a field isAdmin in User Model

const createProduct = asyncHandler(async(req, res) => {
    
    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample desc',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)

})

// @description     Update a product
// @route     PUT /api/products/:id
// @access    Private and only for Admin - means can only be accessed by a admin user, we have a field isAdmin in User Model

const updateProduct = asyncHandler(async(req, res) => {

    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }
    else{
        res.status(404)
        throw new Error('Product Not Found')
    }
    

})

// @description     Create new review
// @route     POST /api/products/:id/reviews
// @access    Private only

const createProductReview = asyncHandler(async(req, res) => {

    const {rating, comment} = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        //checking if the user already reviewed the product
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed) {
            res.status(400)
            throw new Error('Product Already Reviewd')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()

        res.status(201).json({message: 'Review added'})
    }
    else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

// @description     Get top rated products 
// @route     GET /api/products/top
// @access    Public

const getTopProducts = asyncHandler(async(req, res) => {
    //const product = Product.find((p) => p._id === req.params.id)
    const product = await Product.find({}).sort({rating: -1}).limit(3)
    if(product) {
        res.json(product)
    }
    else {
        //res.status(404).json({message: 'Product not found'})
        res.status(404)
        //does same as above since we added error handling middleware we can directly throw the error
        throw new Error('Product not found')
    }
})

export {getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts}