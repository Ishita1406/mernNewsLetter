import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import FlowRoutes from './routes/FlowRoutes.js';
import path from 'path';

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('MongoDB connected!');
}).catch((error) => {
    console.log(error);
});

const __dirname = path.resolve();

const app = express();

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});

app.use(express.json());
app.use(cors());

app.use('/backend/flow', FlowRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message,
    });
});