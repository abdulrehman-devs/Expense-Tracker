import express from 'express';
import cors from 'cors';
import signupRoutes from './routes/signupRoute.js';
import connectDB from './config/dbConnection.js';
import dotenv from 'dotenv';
import signinRoutes from './routes/signinRoute.js';
import protectedRoutes from './routes/protectedRoutes.js';

// Basic COnfigurations
dotenv.config(); 
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/signup', signupRoutes);
app.use('/signin', signinRoutes);
app.use('/dashboard', protectedRoutes);

// Starting Server
app.listen(process.env.PORT, () => {
    console.log(`App running at port ${process.env.PORT}`)
    connectDB();
});

