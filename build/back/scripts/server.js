import dotenv from 'dotenv';
import app from './app.js';
import { initDb } from '../scripts/config/dbInit.js';
dotenv.config();

const now = new Date().toLocaleTimeString("fr-FR");

(async () => {
  await initDb();

  const server = app.listen(3000, () => {
    console.log(`✅ Serveur lancé et prêt sur http://localhost:3000 à ${now}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error('❌ Port 3000 déjà utilisé. Change de port ou tue le processus fautif.');
    } else {
      console.error('❌ Erreur serveur :', err);
    }
  });
})();
