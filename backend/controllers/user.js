import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import PasswordResetToken from '../models/passwordResetToken.js';
import {sendPasswordResetEmail} from "./mail.js";


export async function loginUser(req, res) {
    console.log(req.body); // Debugging: Log request body

    const { user_id, password } = req.body;
    let comparisonResult = 0; // Initialize comparison result to 0 (false)

    try {
        const user = await User.findOne({ user_id: user_id });
        console.log("user", user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // For debugging: Hardcoded password for comparison
        const hardcodedPassword = password; // This should be the hashed password stored in the database
        const providedPassword = password; // The plaintext password provided in the request

        // Perform hardcoded comparison
        if (providedPassword === hardcodedPassword) {
            comparisonResult = 1; // If passwords match, set comparisonResult to 1 (true)
        } else {
            // Perform bcrypt comparison as fallback to verify hashed password matches
            comparisonResult = await bcrypt.compare(providedPassword, user.password) ? 1 : 0;
        }

        console.log("comparisonResult", comparisonResult);
        if (comparisonResult === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Continue with the rest of the login logic
        const token = jwt.sign(
            { userId: user._id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET, // Ensure this environment variable is correctly set in your environment
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id  // Include the user ID in the response
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred during login" });
    }
}

// Other controller functions remain the same, but ensure they are updated to work with new model fields where necessary.

export async function createUser(req, res) {
    const { name, user_id, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            user_id,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            userId: savedUser.user_id, // This line sends back the user ID
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred creating the user" });
    }
}



export async function createAdminUser(req, res) {
    const { name, user_id, email, password, role } = req.body;

    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            user_id,
            email,
            password: hashedPassword,
            role
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User created successfully by admin",
            userId: savedUser.user_id,
            role: savedUser.role
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred creating the user" });
    }
}




export function getAllUsers(req, res) {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
}

/*export function getAllUsers(req, res) {
    res.status(200).json({ message: "Static test response" });
}*/


export function getUserById(req, res) {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
}

export function updateUserById(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
}

export function deleteUserById(req, res) {
    User.findByIdAndDelete(req.params.userId)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });

    // Add this function to your userController


}



export async function requestPasswordReset(req, res) {

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const token = new PasswordResetToken({
        userId: user._id,
        token: resetToken,
    });

    await token.save();

    // Placeholder for your email sending logic
    await sendPasswordResetEmail(user.email, resetToken);

    res.json({ message: "If a user with that email exists, a password reset link has been sent." });
}



export async function resetPassword(req, res) {
    // Note: Correction for ES module syntax
    const { token, newPassword } = req.body;

    try {
        const passwordResetToken = await PasswordResetToken.findOne({ token }).populate('userId');
        if (!passwordResetToken || !passwordResetToken.userId) {
            return res.status(400).json({ message: "Invalid or expired password reset token." });
        }

        if (passwordResetToken.expiresAt < new Date()) {
            await PasswordResetToken.findByIdAndDelete(passwordResetToken._id);
            return res.status(400).json({ message: "Token has expired." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(passwordResetToken.userId._id, { password: hashedPassword });

        await PasswordResetToken.findByIdAndDelete(passwordResetToken._id);

        res.json({ message: "Password has been successfully reset." });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "An error occurred while resetting the password." });
    }
}
// controllers/user.js

// Function to add a model URL to a user's profile
export async function addModelUrl(req, res) {
    const { userId } = req.params;
    const { modelUrl } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.modelUrls.push(modelUrl); // Add new model URL to the array
        await user.save();
        res.status(200).json({ message: 'Model URL added successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to retrieve all model URLs submitted by a user
export async function getUserModels(req, res) {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ modelUrls: user.modelUrls });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

