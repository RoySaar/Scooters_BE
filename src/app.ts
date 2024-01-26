import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import userRoutes from "./routes/userRoutes";
import parkingRoutes from "./routes/parkingRoutes";
import scooterRoutes from "./routes/scooterRoutes";
import failureRoutes from "./routes/failureRoutes";
import authRoutes from "./routes/authRoutes";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.MY_SECRET_KEY || '';
const MONGO_URL = process.env.MONGO_PRIVATE_URL || '';

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: SECRET, resave: false, saveUninitialized: false }));

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use('/user', userRoutes);
app.use('/scooter', scooterRoutes);
app.use('/parking', parkingRoutes);
app.use('/failure', failureRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
