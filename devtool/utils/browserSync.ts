import fs from 'fs';
import path from 'path';
import browserSync from 'browser-sync';
import net from 'net';

const bs = browserSync.create();

const buildPublic = path.join(import.meta.dirname, '../../build/public');
const buildViews = path.join(import.meta.dirname, '../../build/back/views');

const waitForPort = (host: string, port: number, interval = 300, maxTries = 50): Promise<void> => {
  let attempts = 0;
  return new Promise((resolve, reject) => {
    const check = () => {
      const socket = net.connect(port, host, () => {
        socket.end();
        resolve();
      });
      socket.on('error', () => {
        attempts++;
        if (attempts >= maxTries) {
          reject(new Error(`⛔ Port ${port} toujours indisponible après ${maxTries * interval}ms`));
        } else {
          setTimeout(check, interval);
        }
      });
    };
    check();
  });
};

(async () => {
  console.log(`⏳ Attente du port 3000 avant démarrage de BrowserSync...`);
  try {
    await waitForPort('localhost', 3000);
    console.log(`✅ Serveur détecté sur le port 3000. Lancement de BrowserSync.`);

    console.log(`🔍 Surveillance des fichiers dans :`);
    console.log(`  - ${buildPublic}`);
    console.log(`  - ${buildViews}`);

    bs.init({
      proxy: 'http://localhost:3000',
      files: [
        path.join(buildPublic, '**/*.*'),
        path.join(buildViews, '**/*.ejs'),
      ],
      open: false,
      notify: false,
      injectChanges: true,
    });

    bs.watch(path.join(buildViews, '**/*.ejs')).on('change', () => {
      console.log('🛠️  Changement EJS détecté, rechargement du navigateur...');
      bs.reload();
    });

    bs.watch(path.join(buildPublic, '**/*.*')).on('change', (file) => {
      console.log(`🛠️  Fichier modifié : ${file}`);
    });

  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
})();