'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likeTweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      likeTweet.belongsTo(models.user)
      likeTweet.belongsTo(models.tweet)
    }
  }
  likeTweet.init({
  }, {
    sequelize,
    modelName: 'likeTweet',
    timestamps : false
  });
  return likeTweet;
};