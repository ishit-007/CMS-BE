'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contentTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contentTypes.init({
    name: DataTypes.STRING,
    attributes: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'contentTypes',
  });
  return contentTypes;
};