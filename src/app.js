import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import cors from "cors";

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mockingRouter from './routes/mocks.router.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT||8080;
// const connection = mongoose.connect(`URL DE MONGO`)
mongoose.connect("mongodb+srv://alejandrobuitragob:Inicio.0001@cluster0.u2v5d.mongodb.net/entregaFinalBackEnd3?retryWrites=true&w=majority&appName=Cluster0")
      .then(()=> console.log("Conectados a los BD"))
      .catch((error) => console.log("Tenemos un problema", error))

app.use(express.json());
app.use(cookieParser());
app.use(cors({
      origin: 'https://front-adoptame.vercel.app',
      credentials: true
}))

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mockingRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
