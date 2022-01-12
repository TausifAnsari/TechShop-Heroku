import asyncHandler from 'express-async-handler'
//generate Json web token
import generateToken from '../utils/generateToken.js'

//Import Model
import User from '../models/userModel.js'


//Saved Token in postman check environment lookup and tests

//note: we use try catch block inside the async function in routes.
// But instead of that we are using a package called express-async-handler which handles exceptions It is a predefined middleware
// We just need to wrap asyncHandler to the asynchronous function

// @description     Auth user & get token
// @route     POST /api/users/login
// @access    Public

//Note: while authentication the email and password
// that is sent is sent in requset body and can be
//accessed by req.body to generate token for this to work
//we add a middleware in server.js express.json
//used for body parser

const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    //find user with same email from db
    const user = await User.findOne({email})

    //we found email now we check if user exist and check if password matches from db
    //but through form user send real password but in db it is in hash format so we need to hash the
    //password, we do this in userModel by creating a method
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})


// @description     Register a new user
// @route     POST /api/users
// @access    Public

//Note: while authentication the email and password
// that is sent is sent in requset body and can be
//accessed by req.body to generate token for this to work
//we add a middleware in server.js express.json
//used for body parser

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    //find user with same email from db
    const userExists = await User.findOne({email})

    //we found email now we check if user exist and check if password matches from db
    //but through form user send real password but in db it is in hash format so we need to hash the
    //password, we do this in userModel by creating a method
    if (userExists) {
        res.status(400)
        throw new Error('User already Exist')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @description     Get user profile
// @route     GET /api/users/profile
// @access    Private - means can only be accessed by a logged in user

//Note: while authentication the email and password
// that is sent is sent in requset body and can be
//accessed by req.body to generate token for this to work
//we add a middleware in server.js express.json
//used for body parser

const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @description     Update user profile
// @route     PUT /api/users/profile
// @access    Private - means can only be accessed by a logged in user

//Note: while authentication the email and password
// that is sent is sent in requset body and can be
//accessed by req.body to generate token for this to work
//we add a middleware in server.js express.json
//used for body parser

const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @description     Get all users
// @route     GET /api/users
// @access    Private and only for Admin - means can only be accessed by a admin user, we have a field isAdmin in User Model 

//Note: while authentication the email and password
// that is sent is sent in requset body and can be
//accessed by req.body to generate token for this to work
//we add a middleware in server.js express.json
//used for body parser

const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})

    res.json(users)
})

// @description     Delete user
// @route     DELETE /api/users/:id
// @access    Private and only for Admin - means can only be accessed by a admin user, we have a field isAdmin in User Model 

//Note: while authentication the email and password
// that is sent is sent in requset body and can be
//accessed by req.body to generate token for this to work
//we add a middleware in server.js express.json
//used for body parser

const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        await user.remove()
        res.json({message : 'User Removed'})
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }

})

// @description     Get user by id
// @route     GET /api/users/:id
// @access    Private and only for Admin - means can only be accessed by a admin user, we have a field isAdmin in User Model 

//Note: while authentication the email and password
// that is sent is sent in requset body and can be
//accessed by req.body to generate token for this to work
//we add a middleware in server.js express.json
//used for body parser

const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if(user) {
        res.json(user)
    }
    else{
        throw new Error('User not found')
    }
})

// @description     Update user 
// @route     PUT /api/users/:id
// @access    Private and only for Admin - means can only be accessed by a admin user, we have a field isAdmin in User Model

//Note: while authentication the email and password
// that is sent is sent in requset body and can be
//accessed by req.body to generate token for this to work
//we add a middleware in server.js express.json
//used for body parser

const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin 

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})


export {authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, updateUser, getUserById}
