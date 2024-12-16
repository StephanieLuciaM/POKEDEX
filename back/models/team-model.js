import { Model, DataTypes } from 'sequelize';
import { sequelize } from './client.js'; 

export class Team extends Model {}

Team.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  tableName: 'team',
  timestamps: false // Pour désactiver les colonnes createdAt/updatedAt
});
