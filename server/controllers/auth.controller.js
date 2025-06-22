import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import promisePool from '../config/db.config.js';
import { validateEmail, validatePassword } from '../utils/validators.js';
import path from 'path';
import fs from 'fs';

const db = promisePool;

// createUser user
export const createUser = async (req, res) => {
    try {
        const { name, email, password, district_name } = req.body;

        // Validate input
        if (!name || !email || !password || !district_name) {
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
            message: 'User Created successfully',
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
            message: 'Error while creating user'
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
                user
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

// update avatar
export const updateAvatar = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if user exists
        const [users] = await db.query(
            'SELECT id, profile_picture FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete old avatar if exists
        if (users[0].profile_picture) {
            const oldAvatarPath = path.join(process.cwd(), users[0].profile_picture);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
        }

        // Update profile picture path in database
        await db.query(
            'UPDATE users SET profile_picture = ? WHERE id = ?',
            [req.file.path, userId]
        );

        // Get updated user data
        const [updatedUser] = await db.query(
            'SELECT id, name, email, role, district_name, profile_picture, created_at FROM users WHERE id = ?',
            [userId]
        );

        res.json({
            success: true,
            message: 'Profile picture updated successfully',
            data: updatedUser[0]
        });
    } catch (error) {
        console.error('Error updating avatar:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating profile picture',
            error: error.message
        });
    }
};

// update profile
export const updateProfile = async (req, res) => {
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
};

// reset password - /auth/reset-password/
export const resetPassword = async (req, res) => {
    try {
        const userId = req.params.id;
        const { password } = req.body;

        // Check if user exists
        const [users] = await db.query(
            'SELECT id FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password
        await db.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, userId]
        );

        res.json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({
            success: false,
            message: 'Error resetting password',
            error: error.message
        });
    }
}

// admin reset password
export const getAdminPassword = async (req, res) => {
    try {
        const role = "admin";
        const default_password = "admin@123";

        // Check if user exists
        const [users] = await db.query(
            'SELECT id, name, email FROM users WHERE role = ?',
            [role]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(default_password, 10);

        // Update user's password
        await db.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, users[0].id]
        );

        res.json({
            success: true,
            data: { user: users[0].name, email: users[0].email, password: default_password },
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({
            success: false,
            message: 'Error resetting password',
            error: error.message
        });
    }
};



// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
    try {
        // Get total users and active/inactive counts
        const [userStats] = await db.query(`
            SELECT 
                COUNT(*) as total_users,
                SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_users,
                SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as inactive_users
            FROM users
        `);

        // Get total projects and active/inactive counts
        const [projectStats] = await db.query(`
            SELECT 
                COUNT(*) as total_projects,
                SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) as active_projects,
                SUM(CASE WHEN status = 'Inactive' THEN 1 ELSE 0 END) as inactive_projects
            FROM all_projects
        `);

        // Get total contact_details
        const [contactStats] = await db.query(`
            SELECT COUNT(*) as total_contacts FROM contact_details
        `);

        res.json({
            success: true,
            data: {
                users: userStats[0],
                projects: projectStats[0],
                contacts: contactStats[0]
            }
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard statistics'
        });
    }
};