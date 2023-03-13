import mongoose from 'mongoose';
const cartCollection = 'carros'
const cartSchema = new mongoose.Schema({
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number
      },
    ],
  });

export const Cart = mongoose.model(cartCollection,cartSchema);