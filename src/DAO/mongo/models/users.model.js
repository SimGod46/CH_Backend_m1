import mongoose from 'mongoose';
const userCollection = 'usuarios'
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password:String
})

export const Usuario = mongoose.model(userCollection,userSchema);