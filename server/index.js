import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import { testConnection } from './config/db.config.js';
// import userRoutes from './routes/user.routes.js';
// import adminRoutes from './routes/admin.routes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;

// Start server only if database connection is successful
const startServer = async () => {
    try {
        const isConnected = await testConnection();
        if (isConnected) {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        } else {
            console.error('Failed to start server: Database connection failed');
            process.exit(1);
        }
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();
