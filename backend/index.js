import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
 
//utils
import connectDB from './config/db.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from './routes/userRoutes.js';

dotenv.config(); 
const port = process.env.PORT || 5000;

connectDB();
const app = express(); 

// => the 3 lines below are middlewares
app.use(express.json());
// Tells Express to automatically parse JSON data in the request body.
app.use(express.urlencoded({ extended: true }));
// Parses URL-encoded form data, like what HTML forms send by default.
app.use(cookieParser());
// Parses cookies sent by the client and makes them available in req.cookies.

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use("/api/category", categoryRoutes)
 
app.use("/api/users", userRoutes); 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

