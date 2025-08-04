import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';  // Correct MongoDB connection function
import userRoute from './routes/user.route.js'; // Adjust path as necessary
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json()); // Body parser middleware for JSON
app.use(express.urlencoded({ extended: true })); // To handle URL encoded data

// MongoDB connection using connectDB function
connectDB();

// Serve a simple response for the root route
app.get('/', (req, res) => {
    res.send('Hello, welcome to the server!');
});


// Routes
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

