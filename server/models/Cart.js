import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: { type: Array, required: true },
        quantity: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const Cart = mongoose.model("Cart", schema);
