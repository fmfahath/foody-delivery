import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//login user-------------------------------------------
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User not found with this ID" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" })
        }

        const token = createToken(user._id)

        if (user.role === 'admin') {
            res.json({ success: true, token, admin: true, userData: user })
        } else {
            res.json({ success: true, token, userData: user })
        }


    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

//register user-------------------------------------------
export const registerUser = async (req, res) => {
    const { name, password, email, role } = req.body;

    try {

        //validate user already exists
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.json({ success: false, message: "User already exists!" })
        }

        //validate email format & password strength
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter valid email" })
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "Enter a strong password (at least 8 characters)" })
        }


        //hasing password
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            role,
            password: hashedPass
        })

        const user = await newUser.save()

        //generate token
        const token = createToken(user._id)

        res.json({ success: true, message: " user Created", token })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

//create jwt token---------------------------------------------
const createToken = (id) => {
    try {
        return jwt.sign({ id }, process.env.JWT_SECRET)
    } catch (error) {
        return res.json({ success: false, message: "token generate error", errorMessage: error.message })
    }
}