import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //token is present in the header with bearer so we split the string with a space and access the second index which includes
            //the token
            token = req.headers.authorization.split(' ')[1]
            //we will get id expires at issued at using verify so to access id we use decoded.id
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            //adding user to the req by verifying the token
            req.user = await User.findById(decoded.id).select('-password')
            
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized, token failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not Authorized, no token')
    }

})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    }
    else{
        res.status(401)
        throw new Error('Not Authorized as an Admin')
    }
}

export {protect, admin}