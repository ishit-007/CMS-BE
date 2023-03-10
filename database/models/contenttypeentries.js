'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contentTypeEntries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contentTypeEntries.init({
    contentTypeId: DataTypes.INTEGER,
    values: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contentTypeEntries',
  });
  return contentTypeEntries;
};