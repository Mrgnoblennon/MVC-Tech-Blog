const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
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
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',    // Reference to the 'posts' table
        key: 'id'         // Reference to the primary key 'id' in the 'posts' table
      }
    }
  },
  {
    sequelize,
    timestamps: true,      // Automatically include timestamps (createdAt and updatedAt) in the table
    underscored: true,     // Use underscored naming conventions for the columns (e.g., created_at instead of createdAt)
    modelName: 'comment'   // Model name in singular form
  }
);

module.exports = Comment;
