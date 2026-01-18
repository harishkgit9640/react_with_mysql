// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import contactRoutes from './routes/contact.routes.js';
import { testConnection } from './config/db.config.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://harishsahu.com",
    "https://www.harishsahu.com",
    "http://harishsahu.com.s3-website.ap-south-1.amazonaws.com"
];

app.use(cors({
    origin: function (origin, callback) {
        // allow REST tools like Postman (no origin)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// IMPORTANT: preflight
app.options("*", cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add this line after your other middleware
app.use('/uploads', express.static(path.join(__dirname, 'assets', 'uploads')));

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);

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