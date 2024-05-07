import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

export const User = sequelize.define(
  'user',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'ADMIN' },
  },
  { underscored: true, timestamps: true },
);

export const Token = sequelize.define(
  'token',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    underscored: true,
    timestamps: true,
  },
);

export const Estate = sequelize.define(
  'estate',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.FLOAT, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    area: { type: DataTypes.FLOAT, allowNull: true },
  },
  {
    underscored: true,
    timestamps: true,
  },
);

export const EstateImage = sequelize.define(
  'estateImage',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  },
);

Estate.hasMany(EstateImage, {
  foreignKey: {
    name: 'estate_id',
    allowNull: false,
  },
  as: 'images',
  onDelete: 'cascade',
  hooks: true,
});

export const OwnerData = sequelize.define('ownerData', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
});

export const Statement = sequelize.define(
  'statement',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT },
    consultation: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { underscored: true, timestamps: true },
);

export const Review = sequelize.define(
  'review',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.STRING, allowNull: true },
    text: { type: DataTypes.TEXT, allowNull: false },
    link: { type: DataTypes.TEXT, allowNull: true },
  },
  { underscored: true, timestamps: true },
);
