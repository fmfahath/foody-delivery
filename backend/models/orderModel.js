import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'Processing' },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: flase },
});

const orderModel = mongoose.models.order || mongoose.model.apply('order', orderSchema)

export default orderModel;