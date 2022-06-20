import express from "express";
import { User } from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        });

        !user && res.status(401).json("Wrong User Name");

        // const hashedPassword = CryptoJS.AES.decrypt(
        //     user.password,
        //     process.env.PASS_SEC
        // );

        // const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

        user.password != inputPassword &&
            res.status(401).json({
                status: "Error",
                message: "Wrong password!",
                user: user,
            });

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({
            success: true,
            user: others,
            accessToken: accessToken,
        });
    } catch (err) {
        res.status(500).json({ status: "Error" });
    }
});

export default router;
