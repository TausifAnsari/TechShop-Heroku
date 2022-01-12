/*const express = require('express')
const dotenv = require('dotenv')
const products = require('./data/products')*/

//MongoDB Atlas successful
//Integrated Postman for backend api calls

import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
//Importing error middleware
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
//Not using below products as it was just a js file with data
//import products from './data/products.js'

//Import Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

//Connecting mongodb database
connectDB()

const app = express()

//morgan middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//predefined middleware to use body parser in auth
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// User defined middlewares
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
//only for image upload using multer
app.use('/api/upload', uploadRoutes)

//for payment access
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

//define uploads folder as static folder
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//for heroku deployment only
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    // * means routes that are not defined above or unknown routes
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname,'frontend', 'build', 'index.html')))
}
else{
    app.get('/', (req, res) => {
        res.send("API is running.......")
    })    
}

//Custom error handler middleware for not found and error
app.use(notFound)
app.use(errorHandler)

/*
Migrating to different file to keep track of all routes at one place
app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})
*/

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold))