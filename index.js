import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import cloudinary from 'cloudinary';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();

app.use(express.json()); 

const port=process.env.PORT;

import userRoutes from './routes/user.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import addressRoutes from './routes/address.js';
import orderRoutes from './routes/order.js';

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', addressRoutes);
app.use('/api', orderRoutes);






app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});