import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
//importing sample data created previously
import users from './data/users.js'
import products from './data/products.js'
//importing models
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
//importing file to connect to database
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async() => {
    try {
        //first clear all the data in the field
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        //add all the data in respective collection (users only)
        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user:adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported'.green.inverse )

        process.exit()

    } catch (error) {
        console.log(`${error.message}`.red.inverse )
        process.exit(1)
    }
}


const destroyData = async() => {
    try {
        //first clear all the data in the field
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Destroyed Data'.red.inverse )

    } catch (error) {
        console.log(`${error.message}`.red.inverse )
        process.exit(1)
    }
}

//node backend/seeder -d
// -d option should destroy the data
//To configure this we do the following
// we call this using script npm run data:import or npm run data:destroy

if(process.argv[2] === '-d'){
    destroyData()
}
else {
    importData()
}
