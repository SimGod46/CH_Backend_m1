import mongoose from 'mongoose';
const productCollection = 'productos'
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    thumbnail: String,
    stock: Number
})

export const Product = mongoose.model(productCollection,productSchema);