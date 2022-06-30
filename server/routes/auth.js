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
        console.log("user", req.body);

        !user && res.status(401).json("Login Fail! Wrong Account Infomation!");

        // const hashedPassword = CryptoJS.AES.decrypt(
        //     user.password,
        //     process.env.PASS_SEC
        // );

        // const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

        user.password != inputPassword &&
            res.status(401).json("Login Fail! Wrong Account Infomation!");
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_REFRESH_KEY
        );

        const { _id, username, isAdmin, ...others } = user._doc;
        res.status(200).json({
            user: { _id, username, isAdmin },
            accessToken,
            refreshToken,
        });
    } catch (err) {
        res.status(500).json({ status: "Error" });
    }
});

router.post("/refreshToken", (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) res.sendStatus(401);
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, data) => {
        if (err) res.sendStatus(403);
        const accessToken = jwt.sign(
            {
                id: data.id,
                isAdmin: data.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.json({ accessToken });
    });
});

export default router;
