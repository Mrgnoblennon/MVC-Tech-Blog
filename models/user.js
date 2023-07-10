const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {

  // Defining the checkPassword method that takes a loginPassword as input
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true   // Ensure the email is in a valid email format
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]       // Validate the password length to be at least 8 characters
      }
    }
  },
  {
    hooks: {
      // Hash the password before creating a new user
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);   // Hash the password using bcrypt with a salt of 10 rounds
        return user;
      },
      // Hash the password before updating a user if the password is modified
      beforeUpdate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);   // Hash the password using bcrypt with a salt of 10 rounds
        }
        return user;
      }
    },
    sequelize,
    timestamps: true,      // Automatically include timestamps (createdAt and updatedAt) in the table
    underscored: true,     // Use underscored naming conventions for the columns (e.g., created_at instead of createdAt)
    modelName: 'user'      // Model name in singular form
  }
);

module.exports = User;
