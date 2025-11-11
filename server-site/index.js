import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js'; 
import pdfRoutes from './routes/pdfRoutes.js';
import subRoutes from './routes/subRoutes.js';

dotenv.config();


const app= express();
const port = process.env.PORT || 5000;


//Connect Database
connectDB();

app.use(cors());
app.use(express.json({ limit: '5mb' })); 

// Routes
app.use('/api/pdf', pdfRoutes);
app.use('/api/subscription', subRoutes);

// Test Route
app.get('/', (req, res) => res.send('MERN PDF backend running'));

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
