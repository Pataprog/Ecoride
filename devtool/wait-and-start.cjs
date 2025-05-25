const waitPort = require('wait-port');
const { exec } = require('child_process');

(async () => {
  console.log('Lancement de Docker Compose...');
  exec('docker compose up -d', async (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur docker compose: ${error.message}`);
      process.exit(1);
    }
    console.log(stdout);

    console.log('Attente que Mongo soit prêt...');
    const mongoReady = await waitPort({ host: 'localhost', port: 27017, timeout: 30000 });
    if (!mongoReady) {
      console.error('Timeout : Mongo non disponible');
      process.exit(1);
    }

    console.log('Mongo prêt. Attente que MySQL soit prêt...');
    const mysqlReady = await waitPort({ host: 'localhost', port: 3306, timeout: 30000 });
    if (!mysqlReady) {
      console.error('Timeout : MySQL non disponible');
      process.exit(1);
    }

    console.log('MySQL prêt. Lancement du watcher...');
    // const npmStart = exec('npm start');
    // npmStart.stdout.pipe(process.stdout);
    // npmStart.stderr.pipe(process.stderr);

    const watcher = exec('npm run start-watcher');
    watcher.stdout.pipe(process.stdout);
    watcher.stderr.pipe(process.stderr);

    console.log('watcher prêt. Lancement du server...');
    const server = exec('npm run server');
    server.stdout.pipe(process.stdout);
    server.stderr.pipe(process.stderr);

    console.log('server prêt. Lancement du browser sync...');
    const browserSync = exec('npm run browser-sync');
    browserSync.stdout.pipe(process.stdout);
    browserSync.stderr.pipe(process.stderr);
    
  });
})();