import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        img: { type: String },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", schema);
