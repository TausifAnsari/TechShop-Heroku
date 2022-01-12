import asyncHandler from 'express-async-handler'

//Import Model
import Order from '../models/orderModel.js'


//note: we use try catch block inside the async function in routes.
// But instead of that we are using a package called express-async-handler which handles exceptions It is a predefined middleware
// We just need to wrap asyncHandler to the asynchronous function

// @description     Create new order
// @route     POST /api/orders
// @access    Private

const addOrderItems = asyncHandler(async(req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if(orderItems && orderItems === 0) {
        res.status(400)
        throw new Error('No Order Items')
    }
    else {
        const order = new Order({
            user: req.user._id,
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice 
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }

})


// @description     Get order by id
// @route     GET /api/orders/:id
// @access    Private

const getOrderById = asyncHandler(async(req, res) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order) {
        res.json(order)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }


})

// @description     Update order to paid
// @route     PUT /api/orders/:id/pay
// @access    Private

const updateOrderToPaid = asyncHandler(async(req, res) => {

    const order = await Order.findById(req.params.id)

    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }


})

// @description     Update order to delivered
// @route     PUT /api/orders/:id/deliver
// @access    Private/Admin

const updateOrderToDelivered = asyncHandler(async(req, res) => {

    const order = await Order.findById(req.params.id)

    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }


})

// @description    Get Logged in user's orders
// @route     GET /api/orders/myorders
// @access    Private

const getMyOrders = asyncHandler(async(req, res) => {

    const orders = await Order.find({user: req.user._id})

    res.json(orders)

})

// @description    Get all orders
// @route     GET /api/orders
// @access    Private/Admin

const getOrders = asyncHandler(async(req, res) => {

    const orders = await Order.find({}).populate('user', 'id name')

    res.json(orders)

})


export {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered}