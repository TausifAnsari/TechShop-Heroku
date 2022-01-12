import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

//Method to check if entered pass matches the db password using compare method it returns bool value
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)

})

/*userSchema.method({
    async matchPassword(password) {
     return bcrypt.compare(password, this.password);
    },
   });*/

const User = mongoose.model('User', userSchema)

export default User