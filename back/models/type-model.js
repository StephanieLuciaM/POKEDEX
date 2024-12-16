import { Model, DataTypes } from 'sequelize';
import { sequelize } from './client.js'; 

export class Type extends Model {}

Type.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  color: {
    type: DataTypes.CHAR(7),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'type',
  timestamps: false 
});
