const User = require("../models/user") 
const Admin = require("../models/admin");
const bcrpt = require("bcrypt")
const jwt = require("jsonwebtoken") 

require('dotenv').config()

exports.userlogin = async (req, res) => { 
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please provide email and password"
            })
        }

        let user = await User.findOne({ email }).select("+password") 

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
        }

        if (await bcrpt.compare(password, user.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
            user = user.toObject()
            user.token = token
            user.password = undefined

            const option = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie("token", token, option).status(200).json({
                success: true,
                token, user, message: "user looged  succes"
            })

        } else {
            return res.status(403).json({
                success: false,
                message: "Invalid credentials"
            })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}

exports.adminlogin = async (req, res) => { 
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please provide email and password"
            })
        }

        let admin = await Admin.findOne({ email }).select("+password") 

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const payload = {
            email: admin.email,
            id: admin._id,
        }

        if (await bcrpt.compare(password, admin.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
            admin = admin.toObject()
            admin.token = token
            admin.password = undefined

            const option = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie("token", token, option).status(200).json({
                success: true,
                token, admin, message: "admin looged  succes"
            })

        } else {
            return res.status(403).json({
                success: false,
                message: "Invalid credentials"
            })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}

exports.usersignup = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, contact } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                Message: "User already exists"
            })
        }

        let hashedpassword;
        try {
            hashedpassword = await bcrpt.hash(password, 10)
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: "nahi hua hash"
            })
        }

        const newUser = await User.create({
            name, email, password: hashedpassword, contact
        })

        return res.status(200).json({
            success: true,
            message: "user created successfully"
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "plz try again later"
        })
    }
}

exports.adminsignup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await Admin.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                Message: "User already exists"
            })
        }

        let hashedpassword;
        try {
            hashedpassword = await bcrpt.hash(password, 10)
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: "nahi hua hash"
            })
        }

        const newAdmin = await Admin.create({
            name, email, password: hashedpassword
        })

        return res.status(200).json({
            success: true,
            message: "user created successfully"
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "plz try again later"
        })
    }
}
