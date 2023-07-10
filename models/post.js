const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',    // Reference to the 'users' table
        key: 'id'         // Reference to the primary key 'id' in the 'users' table
      }
    }
  },
  {
    sequelize,
    timestamps: true,      // Automatically include timestamps (createdAt and updatedAt) in the table
    underscored: true,     // Use underscored naming conventions for the columns (e.g., created_at instead of createdAt)
    modelName: 'post'      // Model name in singular form
  }
);

module.exports = Post;
