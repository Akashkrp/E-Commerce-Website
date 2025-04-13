import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
 
//utils
import connectDB from './config/db.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from "./routes/uploadRoutes.js";

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
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

