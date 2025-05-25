import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db';
class User extends Model {
    id;
    email;
    password;
}
User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    modelName: 'User',
});
export default User;
