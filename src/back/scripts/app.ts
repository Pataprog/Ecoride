import express from 'express';
import path from 'path';
import viewRouter from '../scripts/routes/views_router.js';

import {sessionMw} from '../scripts/middlewares/sessionMw.js';




const app = express();

// Servir les fichiers statiques
app.use(express.static(path.join(import.meta.dirname,'..','..','public')));

// Moteur de vue 
app.set('views', path.join(import.meta.dirname,'..','views'));
app.set('view engine', 'ejs');
 

// Middlewares
app.use(sessionMw);


// Route 
app.use("/", viewRouter);





export default app;