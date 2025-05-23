import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import promisePool from '../config/db.config.js';
import { validateEmail, validatePassword } from '../utils/validators.js';

const db = promisePool;

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: 'assets/uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// register user
export const register = async (req, res) => {
    try {
        const { name, email, password, district_name } = req.body;

        // Validate input
        if (!name || !email || !password || !district_name ) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }


        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if user already exists
        const [existingUsers] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role, district_name) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, 'user', district_name]
        );

        // Generate JWT token
        const token = jwt.sign(
            { id: result.insertId, email, role: 'user' },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                token,
                user: {
                    id: result.insertId,
                    name,
                    email,
                    role: 'user'
                }
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering user'
        });
    }
};

// login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user
        const [users] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const user = users[0];

        if (user.status === 'inactive') {
            return res.status(401).json({
                success: false,
                message: 'User is inactive'
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, status: user.status },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging in'
        });
    }
};

// get users
export const getUsers = async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, name, email, role, district_name, status,profile_picture, created_at FROM users'
        );

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users'
        });
    }
};

// toggle status
export const toggleStatus = async (req, res) => {
    try {
        const userId = req.params.id;
        
        // First check if user exists
        const [users] = await db.query(
            'SELECT id, status FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Toggle the status (if active -> inactive, if inactive -> active)
        const newStatus = users[0].status === 'active' ? 'inactive' : 'active';
        
        // Update the user's status
        await db.query(
            'UPDATE users SET status = ? WHERE id = ?',
            [newStatus, userId]
        );

        res.json({
            success: true,
            message: `User status updated to ${newStatus}`,
            data: {
                id: userId,
                status: newStatus
            }
        });
    } catch (error) {
        console.error('Toggle status error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating user status'
        });
    }
};

// get user by id
export const getUserById = async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, name, email, role, district_name, status,profile_picture FROM users WHERE id = ?',
            [req.params.id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: users[0]
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile'
        });
    }
};

// logout user
export const logout = (req, res) => {
    // Clear the JWT token from client by setting an expired cookie
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.json({
        success: true,
        message: 'Logged out successfully'
    });
};

// delete user
export const deleteUser = async (req, res) => {
    try {
        // First check if user exists
        const [users] = await db.query(
            'SELECT id FROM users WHERE id = ?',
            [req.params.id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete the user
        await db.query(
            'DELETE FROM users WHERE id = ?',
            [req.params.id]
        );

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting user'
        });
    }
};

// update profile

const upload = multer({
    storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
}).single('profile_picture');

// update profile
export const updateProfile = async (req, res) => {

    upload(req, res, async (err) => {
        
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        try {
            const { name, email, district_name, current_password, new_password } = req.body;
            const userId = req.params.id;
           

            // Verify current password if changing password
            if (new_password) {
                const [user] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
                const isValid = await bcrypt.compare(current_password, user[0]?.password);
                if (!isValid) {
                    return res.status(400).json({
                        success: false,
                        message: 'Current password is incorrect'
                    });
                }
            }

            // Update user profile
            const updateData = {};
            if (name) updateData.name = name;
            if (email) updateData.email = email;
            if (district_name) updateData.district_name = district_name;

            if (new_password) {
                updateData.password = await bcrypt.hash(new_password, 10);
            }

            if (req.file) {
                updateData.profile_picture = req.file.path;
            }

            await db.query(
                'UPDATE users SET ? WHERE id = ?',
                [updateData, userId]
            );

            // Get updated user data
            const [updatedUser] = await db.query(
                'SELECT id, name, email, role, district_name, profile_picture, created_at FROM users WHERE id = ?',
                [userId]
            );

            res.json({
                success: true,
                message: 'Profile updated successfully',
                data: updatedUser[0]
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating profile',
                error: error.message
            });
        }
    });
};