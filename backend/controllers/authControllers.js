import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();


const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        user = new User({
            fullName,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token, user });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
            if (err) throw err;

            console.log(user)
            console.log("This is the token which is coming from the backend", token)
            res.json({ success: true, message: "hiii", token, user });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

};

export { signup, login }
