import dotenv from 'dotenv';
import app from './app.js';
import { initDb } from '../scripts/config/dbInit.js';

dotenv.config();

const now = new Date().toLocaleTimeString("fr-FR");

(async () => {
  await initDb();
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000 here we go ! at : ' + now);

app.listen(3000, () => {
  console.log('✅ Serveur lancé !');
}).on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error('❌ Port 3000 déjà utilisé. Change de port ou tue le processus fautif.');
  } else {
    console.error('❌ Erreur serveur :', err);
  }
});



});
});
