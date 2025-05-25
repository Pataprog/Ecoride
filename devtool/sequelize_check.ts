import sequelize from '../build/back/scripts/config/db.js';

sequelize.authenticate()
  .then(() => console.log('✅ Connexion à MySQL réussie'))
  .catch((err) => console.error('❌ Connexion à MySQL échouée :', err));