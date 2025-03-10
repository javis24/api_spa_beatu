import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/Database.js';
import UserRoute  from './routes/UserRoute.js';
import PacienteRoute from './routes/PacienteRoute.js';

dotenv.config();

(async () => {
   await db.sync();
})();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));

app.use(cors({
    credentials: true,
    origin: 'https://api-spa-beatu.vercel.app/'
}));

app.use(express.json());
app.use(UserRoute);
app.use(PacienteRoute);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port');
    
    });