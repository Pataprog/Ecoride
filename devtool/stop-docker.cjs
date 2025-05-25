const { exec } = require('child_process');

console.log('Arrêt des conteneurs Docker en cours...');
exec('docker compose down', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur lors de l’arrêt de Docker: ${error.message}`);
    process.exit(1);
  }
  console.log(stdout);
  console.log('Docker est arrêté. Si ton serveur Node tourne encore, arrête-le manuellement.');
});