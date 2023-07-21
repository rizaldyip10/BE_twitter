'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tweet.belongsTo(models.user)
      tweet.hasMany(models.likeTweet)
    }
  }
  tweet.init({
    content: {
      type : DataTypes.STRING,
      allowNull: false
    },
    Image : {
      type : DataTypes.STRING,
      allowNull : true
    }
  }, {
    sequelize,
    modelName: 'tweet',
  });
  return tweet;
};