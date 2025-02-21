const { DataTypes } = require("sequelize"); // ✅ Correct Import
const sequelize = require("../lib/db"); // ✅ Import the sequelize instance

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    timestamps: true, // Automatically adds `createdAt` & `updatedAt`
  }
);

module.exports = User; // ✅ Export User model
