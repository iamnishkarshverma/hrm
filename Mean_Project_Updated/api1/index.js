import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import employeeRoute from './routes/employee.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import checkInCheckOutRoutes from './routes/checkInCheckOutRoutes.js'


const app = express();
dotenv.config();

// Use Route 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/employee", employeeRoute);
app.use('/api/checkincheckout', checkInCheckOutRoutes);

// Response Handlere Middleware
app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something Went Wrong!";
    return res.status(statusCode).json({
        success: [200,201,204].some(a=> a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    });
});


// DB Connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URL);
        console.log("Connected to DB!")
    }
    catch (error) {
        throw error;
    }
}


// Server Running on PORT
app.listen(8000, () => {
    connectMongoDB();
    console.log("Connected to Backend!")
});