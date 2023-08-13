import mongoose from 'mongoose';
const ticketCollection = 'tickets'
const ticketSchema = new mongoose.Schema({
    code: String,
    purchase_datetime: String,
    amount: Number,
    purchaser: String
})

export const Ticket = mongoose.model(ticketCollection,ticketSchema);