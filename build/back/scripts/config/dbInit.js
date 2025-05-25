import sequelize from '../config/db.js';
export async function initDb() {
    try {
        await sequelize.sync({ alter: true });
        console.log('🛠️ Base SQL synchronisée');
    }
    catch (error) {
        console.error('❌ Erreur d\'initialisation DB :', error);
        process.exit(1);
    }
}
