import bcrypt from 'bcryptjs';
import { User } from '../models/User.js'; // Adjust path according to your project structure
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    console.log('Register API called');
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if all fields are provided
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate email using regex
        const emailRegex = /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        // Check if the email already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Create JWT token
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        // Set the token as a cookie in the response
        res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,  // 1 day in milliseconds
            httpOnly: true,
            sameSite: "strict"
        });

        // Respond with success message and user data
        return res.status(201).json({
            success: true,
            message: `Welcome ${newUser.firstName}`,
            user: newUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register"
        });
    }
};

export const logout = async (_, res) => {
    try {
        // Clear the cookie for logout
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully", 
            success: true
        });
    } catch (error) {
        console.log(error); 
        return res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
};
