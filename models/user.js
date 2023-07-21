'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasOne(models.tweet)
      user.hasMany(models.likeTweet)
    }
  }
  user.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    isVerify : {
      type : DataTypes.STRING,
      defaultValue : false
    },
    totalLogin : {
      type : DataTypes.INTEGER,
      defaultValue : 0
    }
  }, {
    sequelize,
    modelName: 'user',
    timestamps: false
  });
  return user;
};